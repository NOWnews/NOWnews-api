
import autoIncrement from 'mongoose-sequence';
import mongoose from 'mongoose';
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
        required: true,
        trim: true
    },

    // 員工編號
    staffId: {
        type: String,
        required: true,
        trim: true
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
        // required: true
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
        trim: true
    },

    // 中心
    Center: {
        type: Schema.Types.ObjectId,
        ref: 'Center',
        // required: true
    },

    // 部門
    Department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        // required: true
    },

    // 職稱
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },

    // 個人連結
    profileLink: {
        type: String,
        trim: true
    },

    // 個人大頭照
    avatar: {
        type: String,
        trim: true
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
    }
});

schema.plugin(autoIncrement, {
    collection_name: 'SerialNumberCounter',
    inc_field: 'sn',
    id: 'user_sn'
});

module.exports = mongoose.model('User', schema);