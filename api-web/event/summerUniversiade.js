
// TODO 為了世大運特別加的
import uuidv4 from 'uuid/v4';
import moment from 'moment-timezone';
import _ from 'lodash';
import config from 'config';

module.exports = (news) => {
    let mode = config.get('web.mode');
    let isWin = false;
    let kindList = [];
    let kindProbability = (list, ballType, probability) => {
        let i = 0;
        while (i < probability) {
            list.push(ballType);
            i ++;
        }
        return list;
    };
    let isChannel = false;
    let mainMenuName = news.MainMenu ? news.MainMenu.name : '--';
    switch(moment.tz('Asia/Taipei').format('YYYYMMDD')) {
        case '20170814':
        case '20170815':
        case '20170816':
        case '20170817':
        case '20170818':
        case '20170819':
        case '20170820':
            // 機率為 80%
            isWin = _.random(1, 10) > 2 ? true : false;
            isChannel = ['運動', '生活', '娛樂'].indexOf(mainMenuName) > -1;
            kindList = kindProbability(kindList, 'basketball', 50);
            kindList = kindProbability(kindList, 'baseball', 20);
            kindList = kindProbability(kindList, 'tennis', 20);
            break;
        case '20170821':
        case '20170822':
        case '20170823':
        case '20170824':
        case '20170825':
        case '20170826':
        case '20170827':
        case '20170828':
        case '20170829':
        case '20170830':
            // 機率為 80%
            isWin = _.random(1, 10) > 2 ? true : false;
            isChannel = ['運動', '政治', '社會'].indexOf(mainMenuName) > -1;
            kindList = kindProbability(kindList, 'volleyball', 50);
            kindList = kindProbability(kindList, 'snooker', 50);
            break;
        case '20170831':
        case '20170901':
        case '20170902':
            // 機率為 90%
            isWin = _.random(1, 10) > 1 ? true : false;
            isChannel = true;
            kindList = kindProbability(kindList, 'basketball', 20);
            kindList = kindProbability(kindList, 'baseball', 20);
            kindList = kindProbability(kindList, 'tennis', 30);
            kindList = kindProbability(kindList, 'volleyball', 15);
            kindList = kindProbability(kindList, 'snooker', 15);
            break;
        default:
            // 這邊是給測試用的
            if (mode === 'develop' || mode === 'staging') {
                isWin = _.random(1, 10) > 1 ? true : false;
                isChannel = true;
                kindList = kindProbability(kindList, 'basketball', 20);
                kindList = kindProbability(kindList, 'baseball', 20);
                kindList = kindProbability(kindList, 'tennis', 30);
                kindList = kindProbability(kindList, 'volleyball', 15);
                kindList = kindProbability(kindList, 'snooker', 15);
            }
    }
    if (isChannel && isWin) {
        let id = uuidv4();
        let createdAt = moment.tz('Asia/Taipei').format('YYYYMMDDHHmm');
        news.SummerUniversiade = {
            id,
            createdAt,
            kind: kindList[_.random(kindList.length - 1)]
        };
    }
    return news;
};