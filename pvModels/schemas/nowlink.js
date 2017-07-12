
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    placement: {
        type: String
    },

    name: {
        type: String
    },

    // 曝光量
    impression: {
        type: Number,
        default: 0
    },

    // 點擊量，目前尚未有此功能
    click: {
        type: Number,
        default: 0
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
    name: 1
});

schema.index({
    createdAt: -1
});

module.exports = schema;
