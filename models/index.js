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
const host = config.get('mongodb.host');
const db = config.get('mongodb.db');
let connection = mongoose.createConnection(`${host}/${db}`);
console.log(chalk.red(`mongodb connect to: ${host}/${db}`));

import userSchema from './schemas/user';
import newsSchema from './schemas/news';
import newsMemoSchema from './schemas/newsMemo';
import newsLogSchema from './schemas/newsLog';
import roleSchema from './schemas/role';
import policySchema from './schemas/policy';
import centerSchema from './schemas/center';
import departmentSchema from './schemas/department';
import imageSchema from './schemas/image';
import videoSchema from './schemas/video';
import tagSchema from './schemas/tag';
import menuSchema from './schemas/menu';

let User = connection.model('User', userSchema);
let News = connection.model('News', newsSchema);
let NewsMemo = connection.model('NewsMemo', newsMemoSchema);
let NewsLog = connection.model('NewsLog', newsLogSchema);
let Role = connection.model('Role', roleSchema);
let Policy = connection.model('Policy', policySchema);
let Center = connection.model('Center', centerSchema);
let Department = connection.model('Department', departmentSchema);
let Image = connection.model('Image', imageSchema);
let Video = connection.model('Video', videoSchema);
let Tag = connection.model('Tag', tagSchema);
let Menu = connection.model('Menu', menuSchema);

module.exports = {
    User,
    News,
    NewsMemo,
    NewsLog,
    Role,
    Policy,
    Center,
    Department,
    Image,
    Video,
    Tag,
    Menu
};