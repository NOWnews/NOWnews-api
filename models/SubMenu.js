
import increment from 'mongoose-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    // 主選單名稱
    name: {
        type: String,
        required: true,
        trim: true
    },

    // 主選單連結
    url: {
        type: String,
        required: true,
        trim: true
    },

    // 是否為外部連結
    external: {
        type: Boolean,
        default: false
    },

    // 主選單權重
    weight: {
        type: Number,
        default: 0
    },

    // 是否為常駐
    undated: {
        type: Boolean,
        default: true
    },

    // 走期開始時間
    started: {
        type: Date
    },

    // 走期結束時間
    ended: {
        type: Date
    },

    // 是否被刪除
    trashed: {
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
    timestamps: {
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('SubMenu', schema);