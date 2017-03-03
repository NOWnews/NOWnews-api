/*
 * 這隻 logout 並不是真的 logout，而是記錄 logout 的時間
 */


import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:user:login');

import publicIp from 'public-ip';
import Promise from 'bluebird';

import { User, LoginTrack } from '../../../models';
import { hashPwd } from '../../../libs'

module.exports = async (req, res, next) => {

    try {

        let { userId } = req.body;

        let ip = await publicIp.v4()
            .then((ip) => {
                return Promise.resolve(ip);
            });

        await LoginTrack.createAsync({
            User: userId,
            action: 'LOGOUT',
            createdAt: Date.now(),
            ip: ip
        });

        return res.status(200).send();
    } catch (err) {
        return next(err);
    }
};