
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({
    action: {
        type: String,
        required: true,
        enum: ['RECEVIE', 'OPEN']
    },
    
    deviceId: {
        type: String,
        required: true
    },
    
    os: {
        type: String,
        required: true,
        enum: ['IOS', 'ANDROID'],
        default: 'ANDROID'
    },

    token: {
        type: String
    },

    type: {
        type: String,
        required: true,
        enum: ['NOTIFICATION']
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
