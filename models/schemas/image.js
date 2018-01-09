
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

import config from 'config';
import formatImage from '../../libs/formatImage';

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
        enum: ['INTERNAL', 'EXTERNAL', 'CNA', 'MNA', 'PINKNOW', 'IFUNNOW', 'SPORTNOW', 'PETSMAO', 'BOBEENOW', 'SIGHT']
        // 內部, 外部, 中央社, 軍聞社, 粉熱鬧, 愛趣味, 運動, 寵毛網, 保庇, 今日觀點
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

schema.index({
    createdAt: -1,
    imageFrom: 1,
    type: 1,
    isTrashed: 1
});

schema.virtual('thumbnail').get(function () {
    return formatImage.thumbnail(this.url);
});

schema.virtual('googleCDN').get(function () {
    return formatImage.googleCDN(this.url);
});

schema.virtual('sizeFormat').get(function () {
    return formatImage.sizeFormat(this.url);
});

schema.virtual('formatCreatedAt').get(function () {
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);

module.exports = schema;
