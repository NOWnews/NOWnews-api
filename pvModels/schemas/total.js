
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    // pageview 的類別
    type: {
        type: String,
        enum: ['NEWS', 'CATEGORY', 'HOME'],
        default: 'NEWS'
    },

    // 分類
    category: {
        type: String,
    },

    // 平台
    platform: {
        type: String,
        enum: ['PC', 'MOBILE', 'TAB'],
        default: 'PC'
    },

    // 瀏覽器
    browser: {
        type: String,
        enum: ['CHROME', 'FIREFOX', 'IE', 'OPREA', 'OTHER'],
        default: 'CHROME'
    },

    // 標題
    title: {
        type: String
    },

    // 連結
    url: {
        type: String,
        default: null
    },

    // 如果是新聞，存入新聞 id
    newsId: {
        type: String
    },

    // pageviews
    pageviews: {
        type: Number,
        default: 0
    },

    // 溫度計
    temperature: {
        type: Number,
        default: 0
    },

    // 加權分數
    weightedScore: {
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

module.exports = schema;
