
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({

    deviceId: {
        type: String,
        required: true
    },

    token: {
        type: String,
        required: true
    },

    os: {
        type: String,
        required: true,
        enum: ['IOS', 'ANDROID'],
        default: 'ANDROID'
    },

    MemberId: {
        type: Schema.Types.ObjectId,
        default: null
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

schema.index({
    deviceId: 1,
    token: 1,
    os: 1
});

schema.virtual('formatCreatedAt').get(function () {
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

module.exports = schema;
