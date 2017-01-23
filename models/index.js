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
console.log(chalk.red(`mongodb connect to: ${host}/${db}`));

import User from './User';
import News from './News';
import NewsMemo from './NewsMemo';
import Role from './Role';
import Policy from './Policy';
import Center from './Center';
import Department from './Department';
import Image from './Image';
// import MainMenu from './MainMenu';
// import SubMenu from './SubMenu';
// import Test from './Test';

module.exports = {
    User,
    News,
    NewsMemo,
    Role,
    Policy,
    Center,
    Department,
    Image,
    // MainMenu,
    // SubMenu,
    // Test
};