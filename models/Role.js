
import autoIncrement from 'mongoose-sequence';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    desc: {
        type: String,
        default: ''
    },

    Policies: [{
        type: Schema.Types.ObjectId,
        ref: 'Policy'
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

schema.plugin(autoIncrement, {
    collection_name: 'SerialNumberCounter',
    inc_field: 'sn',
    id: 'role_sn'
});

module.exports = mongoose.model('Role', schema);