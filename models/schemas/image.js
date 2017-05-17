
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
        enum: ['NEWS','AVATAR'],
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

schema.virtual('thumbnail').get(function () {
    let url = config.get('general.thumbnail.url');
    let width = config.get('general.thumbnail.width');
    let quality = config.get('general.thumbnail.quality');
    return `${url}/?w=${width}&q=${quality}&src=${encodeURIComponent(this.url)}`;
});

schema.virtual('formatCreatedAt').get(function () {
    return moment(this.createdAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment(this.updatedAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);

module.exports = schema;
