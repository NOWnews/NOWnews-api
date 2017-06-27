
import Promise from 'bluebird';
import chalk from 'chalk';

import { User, Policy, Role, Center, Department, Menu } from '../models';
import { hashPwd } from '../libs';

import policyData from './policy';
import roleData from './role';
import centerData from './center';
import departmentData from './department';
import superuserData from './superuser';
import usersData from './users';
import menusData from './menus';

module.exports = async () => {

    // 處理 Policy 資料
    policyData.forEach(async (data) => {
        let doc = await Policy.findById(data._id).execAsync();
        if(doc) {
            return;
        }
        await Policy.createAsync(data);
    });

    // 處理 Role 資料
    roleData.forEach(async (data) => {
        let doc = await Role.findById(data._id).execAsync();
        if(doc) {
            return;
        }
        await Role.createAsync(data);
    });

    // 處理 Center 資料
    centerData.forEach(async (data) => {
        let doc = await Center.findById(data._id).execAsync();
        if(doc) {
            return;
        }
        await Center.createAsync(data);
    });

    // 處理 department 資料
    departmentData.forEach(async (data) => {
        let doc = await Department.findById(data._id).execAsync();
        if(doc) {
            return;
        }
        await Department.createAsync(data);
    });

    // 處理 User 資料
    let superuser = await User.findById('530000000000000000000001').execAsync();
    if(!superuser) {
        superuserData.password = hashPwd(superuserData.password);
        await User.createAsync(superuserData);
    }

    // 處理一些預設使用者資料
    usersData.forEach(async (data) => {
        let doc = await User.findById(data._id).execAsync();
        if(doc) {
            return;
        }
        await User.createAsync(data);
    });


    // 處理一些預設使用者資料
    menusData.forEach(async (data) => {
        let doc = await Menu.findById(data._id).execAsync();
        if(doc) {
            return;
        }
        await Menu.createAsync(data);
    });

    console.log(chalk.green(`初始化資料完成`));
};