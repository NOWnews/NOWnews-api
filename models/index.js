import Promise from 'bluebird';
import mongoose from 'mongoose';
import chalk from 'chalk';
import config from 'config';
import autoIncrement from 'mongoose-auto-increment';

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

const connection = mongoose.createConnection(`${host}/${db}`);
autoIncrement.initialize(connection);
console.log(chalk.red(`mongodb connect to: ${host}/${db}`));

let User = connection.model('User', require('./schemas/user'));
let News = connection.model('News', require('./schemas/news'));
let NewsMemo = connection.model('NewsMemo', require('./schemas/newsMemo'));
let NewsLog = connection.model('NewsLog', require('./schemas/newsLog'));
let Role = connection.model('Role', require('./schemas/role'));
let Policy = connection.model('Policy', require('./schemas/policy'));
let Center = connection.model('Center', require('./schemas/center'));
let Department = connection.model('Department', require('./schemas/department'));
let Image = connection.model('Image', require('./schemas/image'));
let Tag = connection.model('Tag', require('./schemas/tag'));
let Menu = connection.model('Menu', require('./schemas/menu'));

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
    Tag,
    Menu
};