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
const host = config.get('admin.mongodb.host');
const db = config.get('admin.mongodb.db');
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
import postBoardSchema from './schemas/postBoard';
import imageSchema from './schemas/image';
import videoSchema from './schemas/video';
import tagSchema from './schemas/tag';
import menuSchema from './schemas/menu';
import loginTrackSchema from './schemas/loginTrack';
import indexpageSchema from './schemas/indexpage';
import specialTopicSchema from './schemas/specialTopic';
import specialChannelSchema from './schemas/specialChannel';
import dailyPlanSchema from './schemas/dailyPlan';
import appVersionSchema from './schemas/appVersion';
import appSplashSchema from './schemas/appSplash';
import appInfoSchema from './schemas/appInfo';
import columnSpecialChannelSchema from './schemas/columnSpecialChannel';
import releaseRule from './schemas/releaseRule';

let User = connection.model('User', userSchema);
let News = connection.model('News', newsSchema);
let NewsMemo = connection.model('NewsMemo', newsMemoSchema);
let NewsLog = connection.model('NewsLog', newsLogSchema);
let Role = connection.model('Role', roleSchema);
let Policy = connection.model('Policy', policySchema);
let Center = connection.model('Center', centerSchema);
let Department = connection.model('Department', departmentSchema);
let PostBoard = connection.model('PostBoard', postBoardSchema);
let Image = connection.model('Image', imageSchema);
let Video = connection.model('Video', videoSchema);
let Tag = connection.model('Tag', tagSchema);
let Menu = connection.model('Menu', menuSchema);
let LoginTrack = connection.model('LoginTrack', loginTrackSchema);
let IndexPage = connection.model('IndexPage', indexpageSchema);
let SpecialTopic = connection.model('SpecialTopic', specialTopicSchema);
let SpecialChannel = connection.model('SpecialChannel', specialChannelSchema);
let DailyPlan = connection.model('DailyPlan', dailyPlanSchema);
let AppVersion = connection.model('AppVersion', appVersionSchema);
let AppSplash = connection.model('AppSplash', appSplashSchema);
let AppInfo = connection.model('AppInfo', appInfoSchema);
let ColumnSpecialChannel = connection.model('columnSpecialChannel', columnSpecialChannelSchema);
let ReleaseRule = connection.model('releaseRule', releaseRule);


module.exports = {
    User,
    News,
    NewsMemo,
    NewsLog,
    Role,
    Policy,
    Center,
    Department,
    PostBoard,
    Image,
    Video,
    Tag,
    Menu,
    LoginTrack,
    IndexPage,
    SpecialTopic,
    SpecialChannel,
    DailyPlan,
    AppVersion,
    AppSplash,
    AppInfo,
    ColumnSpecialChannel,
    ReleaseRule
};
