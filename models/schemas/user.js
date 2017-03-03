
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({

    // 姓名
    name: {
        type: String,
        required: true,
        trim: true
    },

    // 暱稱
    nickname: {
        type: String,
        trim: true,
        sparse: true,
        default: null
    },

    // 員工編號
    staffId: {
        type: String,
        trim: true,
        sparse: true,
        default: null
    },

    // 管理員的狀態
    status: {
        type: String,
        enum: ['NEWBIE', 'REGULAR', 'SUSPENDED', 'LEAVING'],
        default: 'NEWBIE'
    },

    // 角色
    Role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        sparse: true,
        default: null
    },

    // email, 用來登入用的
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // 密碼
    password: {
        type: String,
        required: true,
    },

    // 電話
    phone: {
        type: String,
        trim: true,
        sparse: true,
        default: null
    },

    // 中心
    Center: {
        type: Schema.Types.ObjectId,
        ref: 'Center',
        sparse: true,
        default: null
    },

    // 部門
    Department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        sparse: true,
        default: null
    },

    // 職稱
    jobTitle: {
        type: String,
        trim: true,
        sparse: true,
        default: null
    },

    // 個人連結
    profileLink: {
        type: String,
        trim: true,
        sparse: true,
        default: null
    },

    // 個人大頭照
    Avatar: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        sparse: true,
        default: null
    },

    // 一些使用者基本設定的地方
    defaultSettings: {

        // 使用者預設主選單
        Menu: {
            type: Schema.Types.ObjectId,
            ref: 'Menu',
            default: null
        }
    },

    // 最後登入時間
    lastLogin: {
        type: Date,
        default: Date.now
    },

    // 是否被刪除
    isTrashed: {
        type: Boolean,
        default: false
    },

    // 是否為系統初始化的超級使用者
    isInitUser: {
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

schema.virtual('formatLastLogin').get(function () {
    return moment(this.lastLogin).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);

module.exports = schema;
