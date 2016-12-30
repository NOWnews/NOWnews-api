
import increment from 'mongoose-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    // 新聞序號
    sn: {
        type: Number,
        required: true,
        unique: true
    },

    // 新聞標題
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 36
    },

    // 新聞短標題
    shortTitle: {
        type: String,
        required: true,
        trim: true,
        maxlength: 16
    },

    // 新聞摘要
    summary: {
        type: String,
        required: true,
        trim: true,
    },

    // 主選單分類
    MainMenu: {
        type: Schema.Types.ObjectId,
        ref: 'MainMenu',
        required: true
    },

    // 子選單分類
    SubMenu: {
        type: Schema.Types.ObjectId,
        ref: 'SubMenu',
        required: true
    },

    // 新聞主圖
    MainPhoto: {
        type: Schema.Types.ObjectId,
        ref: 'Photo',
        required: true
    },

    // 新聞主影音
    MainVideo: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },

    // 新聞內容
    content: {
        type: String,
        required: true
    },

    // 自由內容
    freeContent: {
        type: String,
    },

    // 新聞類別
    type: {
        type: String,
        enum: ['NEWS', 'VIDEO', 'PHOTO'], // 一般新聞, 影音新聞, 圖片新聞
        default: 'NEWS'
    },

    // 新聞狀態
    status: {
        type: String,
        enum: ['DRAFT', 'REVIEW', 'RELEASE'], // 草稿, 審核中, 發布
        default: 'DRAFT'
    },

    // 新聞追蹤碼
    traceCode: {
        type: String
    },

    // 是否為成人
    adult: {
        type: Boolean,
        default: false
    },

    // 是否可外送
    delivery: {
        type: Boolean,
        default: true
    },

    // 新聞的位置，做 LBS 用
    location: {
        lat: {
            type: Number
        },
        long: {
            type: Number
        }
    },

    // 編輯紀錄
    logs: [{
        type: Schema.Types.Mixed
    }],

    // 作者，同 CreatedBy
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },

    // 是否被刪除
    trashed: {
        type: Boolean,
        default: false
    },

    // 建立者
    CreatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },

    // 更新者
    UpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
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
    timestamps: {
        updatedAt: 'updatedAt'
    }
});

schema.plugin(increment, {
    modelName: 'News',
    fieldName: 'sn',
    start: 1,
    increment: 1,
});

module.exports = mongoose.model('News', schema);