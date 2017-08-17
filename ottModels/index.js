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
const host = config.get('admin.ottMongodb.host');
const db = config.get('admin.ottMongodb.db');
let connection = mongoose.createConnection(`${host}/${db}`);
console.log(chalk.red(`mongodb connect to: ${host}/${db}`));

import providerSchema from './schemas/provider';
import categorySchema from './schemas/category';
import channelSchema from './schemas/channel';

let Provider = connection.model('Provider', providerSchema);
let Category = connection.model('Category', categorySchema);
let Channel = connection.model('Channel', channelSchema);

module.exports = {
    Provider,
    Category,
    Channel
};