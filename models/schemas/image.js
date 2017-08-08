
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

import config from 'config';

let schema = new Schema({

    // 圖片的標題
    title: {
        type: String,
        default: null,
        trim: true
    },

    // 圖片的描述(圖說)
    desc: {
        type: String,
        default: null,
        trim: true
    },

    // 影片關鍵字
    keyword: {
        type: String,
        default: null
    },

    // 圖片來源
    imageFrom: {
        type: String,
        default: 'INTERNAL',
        enum: ['INTERNAL', 'EXTERNAL', 'CNA'] // 內部, 外部, 中央社
    },

    // 原始的檔案名稱
    originalname: {
        type: String,
        default: null,
        trim: true
    },

    // 圖片的類別(jpg, png)
    format: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },

    // 圖片的分類
    type: {
        type: String,
        enum: ['NEWS','AVATAR', 'SPLASH'],
        default: 'NEWS'
    },

    // 圖片的模式
    mode: {
        type: String,
        enum: ['NORMAl', '360VIEW'],
        default: 'NORMAl'
    },

    mimetype: {
        type: String,
        trim: true,
        default: null
    },

    // 圖片的寬
    width: {
        type: Number,
        default: null
    },

    // 圖片的高
    height: {
        type: Number,
        default: null
    },

    // 是否可外送
    isDeliver: {
        type: Boolean,
        default: true
    },

    // 此圖片標籤(關鍵字只會有一個)
    Tag: {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        default: null
    },

    // 圖片的連結
    url: {
        type: String,
        required: true
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

    // 更新者
    UpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
}, {
    versionKey: false,
    timestamps: {
        updatedAt: 'updatedAt'
    },
    toJSON:{
        virtuals: true,
    }
});

schema.index({
    isTrashed: 1
});

schema.index({
    isTrashed: 1,
    type: 1
});

schema.virtual('thumbnail').get(function () {

    let imgRegexString = /^(http|https):\/\/img.nownews.com\//;
    let otherRegexString = /^(http|https):\/\/[A-Za-z]+.nownews.com\//;

    let imgMatchArray = this.url.match(imgRegexString);
    let otherMatchArray = this.url.match(otherRegexString);

    // 如果不屬於 http://xxx.nownews.com 的圖片網址
    if(imgMatchArray === null && otherMatchArray === null) {
        return this.url;
    }

    // 如果是 http://img.nownews.com 的圖片網址
    if(imgMatchArray) {
        let url = config.get('general.thumbnail.url');
        let replaceString = imgMatchArray[0];
        let srcUrl = this.url.replace(replaceString, '/');
        return `${url}/?w=1080&q=70&src=${encodeURIComponent(srcUrl)}`;
    }

    // 如果是 http://[A-Za-z].nownews.com 的圖片網址
    if(otherMatchArray) {
        let url = config.get('general.thumbnail.url');
        return `${url}/?w=1080&q=70&src=${encodeURIComponent(this.url)}`;
    }
});

schema.virtual('googleCDN').get(function () {

    let imgRegexString = /^(http|https):\/\/img.nownews.com\/nownews_[A-Za-z1-9]+\/[A-Za-z]+\//;
    let otherRegexString = /^(http|https):\/\/[A-Za-z]+.nownews.com\//;

    let imgMatchArray = this.url.match(imgRegexString);
    let otherMatchArray = this.url.match(otherRegexString);

    // 如果不屬於 http://xxx.nownews.com 的圖片網址
    if(imgMatchArray === null && otherMatchArray === null) {
        return this.url;
    }

    // 如果是 http://img.nownews.com 的圖片網址
    if(imgMatchArray) {
        let replaceString = imgMatchArray[0];
        let fileName = this.url.replace(replaceString, '');
        return `https://rssimg.nownews.com/images/${fileName}`;
    }

    // 如果是 http://[A-Za-z].nownews.com 的圖片網址
    if(otherMatchArray) {
        let url = config.get('general.thumbnail.url');
        return `${url}/?w=1080&q=100&src=${encodeURIComponent(this.url)}`;
    }
});

schema.virtual('formatCreatedAt').get(function () {
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);

module.exports = schema;
