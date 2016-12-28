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
 * mongodb 連線資訊
 */
const host = config.get('mongodb.host');
const db = config.get('mongodb.db');
mongoose.connectAsync(`${host}/${db}`);
const connection = mongoose.connection;
console.log(chalk.blue(`mongodb connect to: ${host}/${db}`));

module.exports = {

};