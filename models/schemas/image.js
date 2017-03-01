
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({

    // 圖片的標題
    title: {
        type: String,
        default: '',
        trim: true
    },

    // 圖片的描述(圖說)
    desc: {
        type: String,
        default: '',
        trim: true
    },

    // 原始的檔案名稱
    originalname: {
        type: String,
        required: true,
        trim: true
    },

    // 圖片的類別(jpg, png)
    format: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    // 圖片的分類
    type: {
        type: String,
        enum: ['NEWS','AVATAR'],
        default: 'NEWS'
    },

    mimetype: {
        type: String,
        required: true,
        trim: true
    },

    // 圖片的寬
    width: {
        type: Number,
        required: true
    },

    // 圖片的高
    height: {
        type: Number,
        required: true
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
        required: true,
        unique: true
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

schema.virtual('formatCreatedAt').get(function () {
    return moment(this.createdAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment(this.updatedAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);

module.exports = schema;
