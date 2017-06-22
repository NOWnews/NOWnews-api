
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({

    // 影片名稱
    title: {
        type: String,
        default: null
    },

    // 影片描述
    desc: {
        type: String,
        default: null
    },

    // 影片關鍵字
    keyword: {
        type: String,
        default: null
    },

    // 影音來源
    videoFrom: {
        type: String,
        default: 'INTERNAL',
        enum: ['INTERNAL', 'EXTERNAL']
    },

    // 原始的檔案名稱
    originalname: {
        type: String,
        trim: true,
        default: null
    },

    // 影片的類別(mp4, avi)
    format: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },

    // 影片的分類
    type: {
        type: String,
        enum: ['NEWS'],
        default: 'NEWS'
    },

    // 影片的模式
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

    // 是否可外送
    isDeliver: {
        type: Boolean,
        default: true
    },

    // 此影片標籤(關鍵字)
    Tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],

    // 影片的連結
    url: {
        type: String,
        required: true
    },

    // 影片的大小
    size: {
        type: Number,
        default: null
    },

    // 是否被刪除
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

schema.virtual('formatCreatedAt').get(function () {
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);

module.exports = schema;
