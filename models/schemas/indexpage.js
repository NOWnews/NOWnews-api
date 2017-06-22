/*
 * 首頁控版管理
 */

import DeepPopulate from 'mongoose-deep-populate';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import config from 'config';
import Promise from 'bluebird';

let Schema = mongoose.Schema;
let deepPopulate = DeepPopulate(mongoose);

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
        default: null
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

schema.statics.findIndexPageAsync = function findIndexPageAsync (cb) {
    let self = this;

    return new Promise((resolve, reject) => {
        self.findOne((err, aliveDoc) => {
            if(err) {
                return reject(err);
            }

            if(aliveDoc) {
                return resolve(aliveDoc);
            }

            self.create({}, (err, newDoc) => {
                if(err) {
                    return reject(err);
                }
                return resolve(newDoc);
            });
        });
    });
};

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt,'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(deepPopulate);

module.exports = schema;
