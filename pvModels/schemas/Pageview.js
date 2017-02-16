
import autoIncrement from 'mongoose-sequence';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({

    // pageview 的類別
    type: {
        type: String,
        enum: ['NEWS', 'CATEGORY', 'HOME']
    },

    // 分類
    category: {
        type: String,
    },

    // 平台
    platform: {
        type: String
    },

    // 標題
    title: {
        type: String
    },

    // 連結
    url: {
        type: String,
        required: true
    },

    // 如果是新聞，存入新聞 id
    newsId: {
        type: String
    },

    // pageview
    pageview: {
        type: Number,
        default: 0
    },

    // 熱度
    hot: {
        type: Number,
        default: 0
    },

    // 建立時間
    createdAt: {
        type: Date,
        default: Date.now
    },

    // 更新時間
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pageview', schema);
