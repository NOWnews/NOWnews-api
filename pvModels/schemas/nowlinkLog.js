
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    placement: {
        type: String
    },

    name: {
        type: String
    },

    // 事件名稱
    event: {
        type: String,
        default: 'EXPOSURE',
        enum: ['EXPOSURE', 'CLICK']
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
    placement: 1,
    event: 1,
    name: 1
});

schema.index({
    createdAt: -1
});

module.exports = schema;
