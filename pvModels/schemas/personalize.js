
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        default: null
    },

    cookie: {
        type: String,
        default: null
    },

    top1: {
        type: Schema.Types.Mixed,
        default: null
    },

    top2: {
        type: Schema.Types.Mixed,
        default: null
    },

    top3: {
        type: Schema.Types.Mixed,
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
    userId: 1,
    createdAt: -1
});

schema.index({
    cookie: 1,
    createdAt: -1
});

module.exports = schema;
