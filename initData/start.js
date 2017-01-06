
import Promise from 'bluebird';
import chalk from 'chalk';

import { User, Policy, Role, Center, Department } from '../models';

import policyData from './policy';
import roleData from './role';
import centerData from './center';
import departmentData from './department';
import superuserData from './superuser';

module.exports = async () => {

    // 處理 Policy 資料
    policyData.forEach(async (data) => {
        let doc = await Policy.findById(data._id).execAsync();
        if(doc) {
            return;
        }
        await Policy.createAsync(data);
    });
    // let policies = Promise.each(policyData, async (data) => {
    //     let doc = await
    // });
    // let policies = await Policy.createAsync(policyData);

    // 處理 Role 資料
    let adminRole = await Role.findById('520000000000000000000001').execAsync();
    if(!adminRole) {
        await Role.createAsync(roleData);
    }

    // 處理 Department 資料
    let adminDepartment = await Department.findById('540000000000000000000001').execAsync();
    if(!adminDepartment) {
        await Department.createAsync(departmentData);
    }

    // 處理 Center 資料
    let adminCenter = await Center.findById('550000000000000000000001').execAsync();
    if(!adminCenter) {
        await Center.createAsync(centerData);
    }

    // 處理 User 資料
    let superuser = await User.findById('530000000000000000000001').execAsync();
    if(!superuser) {
        await User.createAsync(superuserData);
    }

    console.log(chalk.green(`初始化資料完成`));
};