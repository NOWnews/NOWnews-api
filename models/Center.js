
import increment from 'mongoose-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    // 編號
    sn: {
        type: Number,
        required: true,
        // unique: true
    },

    name: {
        type: String,
        required: true
    },

    Departments: [{
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }],

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
    timestamps: {
        updatedAt: 'updatedAt'
    }
});

schema.plugin(increment, {
    modelName: 'Center',
    fieldName: 'sn',
    start: 1,
    increment: 1,
});

module.exports = mongoose.model('Center', schema);