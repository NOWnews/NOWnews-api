
import Promise from 'bluebird';
import chalk from 'chalk';

import { User, Policy, Role, Center, Department, Menu, Image } from '../models';
import { hashPwd } from '../libs';

import policyData from './policy';
import roleData from './role';
import centerData from './center';
import departmentData from './department';
import superuserData from './superuser';
import usersData from './users';
import menusData from './menus';
import imagesData from './images';

module.exports = async () => {

    console.log(chalk.green(`開始初始化資料`));

    // 處理 images 資料
    await Promise.each(imagesData, (data) => {
        return Image.findOneAndUpdateAsync({
            _id: data._id
        }, {
            $set: {
                url: data.url,
                isDeliver: data.isDeliver,
                title: data.title,
                desc: data.desc
            }
        }, {
            upsert: true
        });
    });

    // 處理 Policy 資料
    await Promise.each(policyData, (data) => {
        return Policy.findOneAndUpdateAsync({
            _id: data._id
        }, {
            $set: {
                group: data.group,
                desc: data.desc,
                path: data.path,
                type: data.type,
                method: data.method
            }
        }, {
            upsert: true
        });
    });

    // 處理 Role 資料
    await Promise.each(roleData, (data) => {
        return Role.findOneAndUpdateAsync({
            _id: data._id
        }, {
            $set: {
                name: data.name,
                desc: data.desc
            }
        }, {
            upsert: true
        });
    });

    // 處理 Center 資料
    await Promise.each(centerData, (data) => {
        return Center.findOneAndUpdateAsync({
            _id: data._id
        }, {
            $set: {
                name: data.name
            }
        }, {
            upsert: true
        });
    });

    // 處理 Department 資料
    await Promise.each(departmentData, (data) => {
        return Department.findOneAndUpdateAsync({
            _id: data._id
        }, {
            $set: {
                name: data.name,
                Centers: data.Centers
            }
        }, {
            upsert: true
        });
    });


    // 處理 SuperUser
    await User.findOneAndUpdateAsync({
            _id: superuserData._id
        }, {
            $set: {
                name: superuserData.name,
                nickname: superuserData.nickname,
                staffId: superuserData.staffId,
                status: superuserData.status,
                Role: superuserData.Role,
                email: superuserData.email,
                password: hashPwd(superuserData.password),
                phone: superuserData.phone,
                Center: superuserData.Center,
                Department: superuserData.Department,
                jobTitle: superuserData.jobTitle,
                profileLink: superuserData.profileLink,
                isInitUser: superuserData.isInitUser
            }
        }, {
            upsert: true
        });

    // 處理 User 資料
    await Promise.each(usersData, (data) => {
        return User.findOneAndUpdateAsync({
            _id: data._id
        }, {
            $set: {
                name: data.name,
                nickname: data.nickname,
                staffId: data.staffId,
                status: data.status,
                Role: data.Role,
                email: data.email,
                password: hashPwd(data.password),
                phone: data.phone,
                Center: data.Center,
                Department: data.Department,
                jobTitle: data.jobTitle,
                profileLink: data.profileLink,
                isInitUser: data.isInitUser
            }
        }, {
            upsert: true
        });
    });

    // 處理 Menu 資料
    await Promise.each(menusData, (data) => {
        return Menu.findOneAndUpdateAsync({
            _id: data._id
        }, {
            $set: {
                name: data.name,
                categoryName: data.categoryName,
                url: data.url,
                isExternal: data.isExternal,
                isAdult: data.isAdult,
                hasChild: data.hasChild,
                ParentId: data.ParentId,
                level: data.level,
                weight: data.weight,
                startedAt: data.startedAt,
                endedAt: data.endedAt,
                isPermanented: data.isPermanented,
                status: data.status,
                isTrashed: data.isTrashed
            }
        }, {
            upsert: true
        });
    });

    console.log(chalk.green(`初始化資料完成`));
};