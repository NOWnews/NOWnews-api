
import autoIncrement from 'mongoose-sequence';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({

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

    // 如果 type=NEWS，這邊為新聞內容
    content: {
        type: String
    },

    // 如果 type=PHOTO，這邊為圖片集合
    Photos: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],

    // 如果 type=VIDEO，這邊為影片集合
    Videos: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],

    // 自由內容
    freeContent: {
        type: String,
    },

    // 新聞開始時間
    startedAt: {
        type: Date,
        default: Date.now
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
        enum: ['DRAFT', 'REVIEW', 'RELEASE', 'CLOSE'], // 草稿, 審核中, 發布, 關閉
        default: 'DRAFT'
    },

    // 新聞追蹤碼
    traceCode: {
        type: String
    },

    // 是否為成人
    isAdult: {
        type: Boolean,
        default: false
    },

    // 是否可外送
    isDeliver: {
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
        old: {
            type: Schema.Types.Mixed
        },
        adjust: {
            type: Schema.Types.Mixed
        }
    }],

    // 備忘錄
    memo: [{
        name: {
            type: String
        },
        createdAt: {
            type: Date
        },
        content: {
            type: String
        }
    }],

    // 作者，同 CreatedBy
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // 此新聞的標籤(關鍵字)
    Tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],

    // 是否為 RSS 內送
    isFeed: {
        type: Boolean,
        default: false
    },

    // RSS 內送的單位
    feedFrom: {
        type: String,
        default: 'OWN'
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
    return moment(this.createdAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment(this.updatedAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement, {
    collection_name: 'SerialNumberCounter',
    inc_field: 'sn',
    id: 'news_sn'
});

module.exports = mongoose.model('News', schema);
