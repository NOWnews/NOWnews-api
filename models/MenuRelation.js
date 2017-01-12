
import increment from 'mongoose-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

   // 主選單
   MainMenu: {
       type: Schema.Types.ObjectId,
       ref: 'MainMenu',
       required: true
   },

   // 子選單
   SubMenu: {
       type: Schema.Types.ObjectId,
       ref: 'SubMenu',
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

module.exports = mongoose.model('SubMenu', schema);