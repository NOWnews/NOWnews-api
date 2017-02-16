
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import autoIncrement from 'mongoose-auto-increment';

let Schema = mongoose.Schema;

let schema = new Schema({

    // 選單名稱
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 6
    },

    // 選單連結
    url: {
        type: String,
        required: true,
        trim: true
    },

    // 是否為外部連結
    isExternal: {
        type: Boolean,
        default: false
    },

    // 是否有子層
    hasChild: {
        type: Boolean,
        default: false
    },

    // 父層的 id
    ParentId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        default: null
    },

    // 層數
    level: {
        type: Number,
        default: 0
    },

    // 權重
    weight: {
        type: Number,
        default: 0
    },

    // 開始時間
    startedAt: {
        type: Date,
        default: null
    },

    // 結束時間
    endedAt: {
        type: Date,
        default: null
    },

    // 沒有走期的連結
    isPermanented: {
        type: Boolean,
        default: true
    },

    // 狀態
    status: {
        type: String,
        enum: ['OPEN','CLOSE'],
        default: 'OPEN'
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

schema.plugin(autoIncrement.plugin, {
    model: 'Menu',
    field: 'sn',
    startAt: 1,
    incrementBy: 1
});

module.exports = schema;
