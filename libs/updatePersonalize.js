import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:updatePersonalize');

import moment from 'moment';
import _ from 'lodash';

import { Personalize, PageviewLog } from '../pvModels';

module.exports = async () => {
    try {

        let started = moment();
        let ended = moment().add(-1, 'h');

        let personalLogs = await PageviewLog.aggregateAsync([
            {
                $match: {
                    cookie: { $ne: null },
                    $and: [ { url: { $ne: null } }, { url: { $ne: '/' } } ],
                    menuId: { $ne: null },
                    createdAt: { $gte: new Date(ended), $lte: new Date(started) }
                }
            },
            {
                $group: {
                    _id: '$cookie',
                    logs: { 
                        '$push': { 
                            cookie: '$cookie',
                            userId: '$userId',
                            url: '$url',
                            menuId: '$menuId'
                        }
                    }
                }
            }
        ]);

        // 利用 log 分析每個使用者的資料
        let personalizes = _.map(personalLogs, (personalLog) => {

            let data = { cookie: personalLog.cookie || null, userId: personalLog.userId || null };
            let count = {};

            // 計算各分類的總量
            _.forEach(personalLog.logs, (log) => {

                if(!count[log.menuId]) {
                    count[log.menuId] = 1;
                }

                if(count[log.menuId]) {
                    count[log.menuId] += 1;
                }
            });

            // 計算各分類的比例
            let countKeys = _.keys(count);
            let total = 0;

            _.forIn(count, (value, key) => {
                total += value; 
            });

            _.forIn(count, (value, key) => {
                count[key] = ( count[key] / total ).toFixed(2);
            });

            // 照分類比例做排序
            let sortedCount = _.keys(count).sort((i,j) => {
                return count[j] - count[i];
            });

            // 整理資料
            data.top1 = {
                menuId: sortedCount[0],
                value: count[sortedCount[0]]
            };
            data.top2 = {
                menuId: sortedCount[1],
                value: count[sortedCount[1]]
            };
            data.top3 = {
                menuId: sortedCount[2],
                value: count[sortedCount[2]]
            };

            return data;
        });
        debug('personalizes = %j', personalizes);

        // 將分析好的資料存入資料庫
        let newMimingData = await Personalize.createAsync(personalizes);

        return Promise.resolve({});
    } catch (err) {
        return Promise.reject(err);
    }
};