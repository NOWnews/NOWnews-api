
import autoIncrement from 'mongoose-sequence';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({

    /*
     * 以下是新聞變更資料
     */
    newsId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    newsSn: {
        type: Number,
        required: true
    },

    // 新聞標題
    title: {
        type: String,
        default: null
    },

    // 新聞短標題
    shortTitle: {
        type: String,
        default: null
    },

    // 新聞摘要
    summary: {
        type: String,
        trim: true,
        default: null
    },

    // 主選單分類
    // MainMenu: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'MainMenu',
    //     default: null
    // },

    // 子選單分類
    // SubMenu: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'SubMenu',
    //     default: null
    // },

    // 新聞主圖物件
    MainPhoto: {
        type: Schema.Types.Mixed,
        default: null
    },

    // 新聞主影音物件
    MainVideo: {
        type: Schema.Types.Mixed,
        default: null
    },

    // 新聞內容
    content: {
        type: String,
        default: null
    },

    // 新聞圖片集合
    Photos: [{
        type: Schema.Types.Mixed
    }],

    // 新聞影片集合
    Videos: [{
        type: Schema.Types.Mixed
    }],

    // 新聞自由內容
    freeContent: {
        type: String,
        default: null
    },

    // 新聞開始時間
    startedAt: {
        type: Date
    },

    // 新聞類別
    type: {
        type: String,
        default: null
    },

    // 新聞狀態
    status: {
        type: String,
        default: null
    },

    // 新聞追蹤碼
    traceCode: {
        type: String,
        default: null
    },

    // 新聞是否為成人
    isAdult: {
        type: Boolean,
        default: null
    },

    // 新聞是否可外送
    isDeliver: {
        type: Boolean,
        default: null
    },

    // 新聞新聞的位置
    location : {
        type: [Number],
        default: null
    },

    // 新聞作者物件
    Author: {
        type: Schema.Types.Mixed,
        default: null
    },

    // 此新聞的標籤(關鍵字)
    Tags: [{
        type: Schema.Types.Mixed
    }],

    // 新聞是否為RSS內送
    isFeed: {
        type: Boolean,
        default: null
    },

    // 新聞RSS內送的單位
    feedFrom: {
        type: String,
        default: null
    },

    // 最後的新聞審稿者
    LastReviewer: {
        type: Schema.Types.Mixed,
        default: null
    },

    /*
     * 以下是 log 本身的資料
     */

    // 做了哪些動作
    action: {
        type: String,
        enum: ['CREATE', 'UPDATE', 'DELETE'],
        default: 'CREATE'
    },

    isTrashed: {
        type: Boolean,
        default: false
    },

    // 建立者
    CreatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // 建立時間
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    toJSON:{
        virtuals: true,
    }
});

schema.virtual('formatCreatedAt').get(function () {
    return moment(this.createdAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement, {
    collection_name: 'SerialNumberCounter',
    inc_field: 'sn',
    id: 'newsLog_sn'
});

module.exports = mongoose.model('NewsLog', schema);
