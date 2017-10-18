/*
 * 清除過期的 FCM Token
 * 啟動方式: NODE_ENV=${NODE_ENV} node tools/cleanInvalidToken.js
 */

require('babel-core/register');
require('babel-polyfill');
var cleanInvalidToken = require('../libs/cleanInvalidToken');

cleanInvalidToken()
.then(()=>{
	console.log('清理完畢');
	process.exit();
})
.catch((e)=>{
	console.error('error', e);
	process.exit();
});