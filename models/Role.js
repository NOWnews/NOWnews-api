
import autoIncrement from 'mongoose-sequence';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
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
    versionKey: false,
    timestamps: {
        updatedAt: 'updatedAt'
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
    id: 'role_sn'
});

module.exports = mongoose.model('Role', schema);