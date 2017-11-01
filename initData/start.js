
import Promise from 'bluebird';
import chalk from 'chalk';

import { User, Policy, Role, Center, Department, Menu, Image, ReleaseRule } from '../models';
import { hashPwd } from '../libs';

import policyData from './policy';
import roleData from './role';
import centerData from './center';
import departmentData from './department';
import superuserData from './superuser';
import usersData from './users';
import menusData from './menus';
import imagesData from './images';
import releaseRule from './releaseRule';

module.exports = async () => {

    // 處理 images 資料
    await Promise.each(imagesData, (data) => {
        return Image.findById(data._id).execAsync()
            .then((doc) => {
                // console.log('do policy data');
                if(doc) {
                    return Promise.resolve({});
                }
                return Image.createAsync(data);
            });
    });

    // 處理 Policy 資料
    await Promise.each(policyData, (data) => {
        return Policy.findById(data._id).execAsync()
            .then((doc) => {
                // console.log('do policy data');
                if(doc) {
                    return Promise.resolve({});
                }
                return Policy.createAsync(data);
            });
    });

    // 處理 Role 資料
    await Promise.each(roleData, (data) => {
        return Role.findById(data._id).execAsync()
            .then((doc) => {
                // console.log('do role data');
                if(doc) {
                    return Promise.resolve({});
                }
                return Role.createAsync(data);
            });
    });

    // 處理 Center 資料
    await Promise.each(centerData, (data) => {
        return Center.findById(data._id).execAsync()
            .then((doc) => {
                // console.log('do center data');
                if(doc) {
                    return Promise.resolve({});
                }
                return Center.createAsync(data);
            });
    });

    // 處理 Department 資料
    await Promise.each(departmentData, (data) => {
        return Department.findById(data._id).execAsync()
            .then((doc) => {
                // console.log('do department data');
                if(doc) {
                    return Promise.resolve({});
                }
                return Department.createAsync(data);
            });
    });


    // 處理 User 資料
    let superuser = await User.findById('530000000000000000000001').execAsync();
    if(!superuser) {
        superuserData.password = hashPwd(superuserData.password);
        await User.createAsync(superuserData);
    }

    await Promise.each(usersData, (data) => {
        return User.findById(data._id).execAsync()
            .then((doc) => {
                // console.log('do user data');
                if(doc) {
                    return Promise.resolve({});
                }
                return User.createAsync(data);
            });
    });

    // 處理 Menu 資料
    await Promise.each(menusData, (data) => {
        return Menu.findById(data._id).execAsync()
            .then((doc) => {
                // console.log('do menu data');
                if(doc) {
                    return Promise.resolve({});
                }
                return Menu.createAsync(data);
            });
    });

    // 處理 releaseRule 資料
    await Promise.each(releaseRule, (data) => {
        return ReleaseRule.findById(data._id).execAsync()
            .then((doc) => {
                // console.log('do releaseRule data');
                if(doc) {
                    return Promise.resolve({});
                }
                return ReleaseRule.createAsync(data);
            });
    });
    releaseRule

    console.log(chalk.green(`初始化資料完成`));
};