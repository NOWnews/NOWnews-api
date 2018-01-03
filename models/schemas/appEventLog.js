
import mongoose from 'mongoose';
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

    event: {
        type: String,
        enum: ['RECEVIE_NOTIFICATION', 'OPEN_NOTIFICATION'],
        default: null
    },

    // 建立時間
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

schema.index({
    deviceId: 1,
    token: 1,
    os: 1
});

module.exports = schema;
