/*
 * 因為瀏覽器沒有固定的 deviceId 因此以 token 為 deviceId 識別
 * 使用前執行 `cleanRepeatTokenForWeb` 清除重複 token
 * 啟動方式: NODE_ENV=${NODE_ENV} node tools/updateDeviceIdForWeb.js
 */

require('babel-core/register');
require('babel-polyfill');
const models = require('../models');
const Promise = require('bluebird');

const updateDeviceIdForWeb = () => {
	return new Promise(async (resolve, reject) => {
		try {

	    	const devices = await models.AppInfo.find()
	        .where('os').equals('WEB')
	        .execAsync();

	        for (device of devices) {
	        	device.set('deviceId', device.token);
	        	await device.saveAsync();
	        	console.log('Finish AppInfo._id', device._id);
	        };
			return resolve();

		} catch (e) {
			return reject(e);
		}
	});
}

updateDeviceIdForWeb()
.then(()=>{
	console.log('更新完成');
	process.exit();
})
.catch((e)=>{
	console.error('error', e);
	process.exit();
});