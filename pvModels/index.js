import Promise from 'bluebird';
import mongoose from 'mongoose';
import chalk from 'chalk';
import config from 'config';

/*
 * 利用 bluebird 將 mongoose 轉換成可以使用 promise
 */
Promise.promisifyAll(mongoose);
mongoose.Promise = Promise;

/*
 * mongodb 連線
 */
const host = config.get('admin.pvMongodb.host');
const db = config.get('admin.pvMongodb.db');
let connection = mongoose.createConnection(`${host}/${db}`);
console.log(chalk.red(`mongodb connect to: ${host}/${db}`));

import pageviewSchema from './schemas/pageview';
import pageviewLogSchema from './schemas/pageviewLog';
import temperatureLogSchema from './schemas/temperatureLog';
import personalizeSchema from './schemas/personalize';
import nowlinkSchema from './schemas/nowlink';
import nowlinkLogSchema from './schemas/nowlinkLog';

let Pageview = connection.model('Pageview', pageviewSchema);
let PageviewLog = connection.model('PageviewLog', pageviewLogSchema);
let TemperatureLog = connection.model('TemperatureLog', temperatureLogSchema);
let Personalize = connection.model('Personalize', personalizeSchema);
let Nowlink = connection.model('Nowlink', nowlinkSchema);
let NowlinkLog = connection.model('NowlinkLog', nowlinkLogSchema);

module.exports = {
    Pageview,
    PageviewLog,
    TemperatureLog,
    Personalize,
    Nowlink,
    NowlinkLog
};