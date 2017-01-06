
import increment from 'mongoose-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    // 編號
    sn: {
        type: Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ''
    },

    // 類型
    type: {
        type: String,
        enum: ['API', 'ADMIN'],
        default: 'ADMIN'
    },

    // 路徑
    path: {
        type: String,
        required: true
    },

    canView: {
        type: Boolean,
        default: true
    },

    canCreate: {
        type: Boolean,
        default: true
    },

    canEdit: {
        type: Boolean,
        default: true
    },

    canDelete: {
        type: Boolean,
        default: true
    }
});

schema.plugin(increment, {
    modelName: 'Policy',
    fieldName: 'sn',
    start: 1,
    increment: 1,
});

module.exports = mongoose.model('Policy', schema);