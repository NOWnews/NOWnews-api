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
 * 
 */
mongoose.connectAsync(`${config.get('mongodb.host')}/${config.get('mongodb.db')}`);
const connection = mongoose.connection;
console.log(chalk.blue(`mongodb connect to: ${config.get('mongodb.host')}/${config.get('mongodb.db')}`));

module.exports = {

};