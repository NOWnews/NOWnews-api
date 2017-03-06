/*
 * 首頁控版管理
 */

import mongoose from 'mongoose';
import moment from 'moment-timezone';
import config from 'config';
let Schema = mongoose.Schema;

let schema = new Schema({

    // 大5小5
    carousels: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'News'
        }]
    },

    // 首頁專題
    specialTopics: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'SpecialTopic'
        }]
    },

    // 首頁特輯
    specialChannels: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'SpecialChannel'
        }]
    },

    // 首頁影音
    videos: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'News'
        }]
    },

    // 更新者
    UpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // 更新時間
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: {
        updatedAt: 'updatedAt'
    },
    toJSON:{
        virtuals: true,
    }
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment(this.updatedAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

module.exports = schema;
