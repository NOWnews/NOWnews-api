
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    url: {
        type: String,
        default: null
    },

    newsId: {
        type: Schema.Types.ObjectId,
        default: null
    },

    menuId: {
        type: Schema.Types.ObjectId,
        default: null
    },

    pageviews: {
        type: Number,
        default: 0
    },

    temperatures: {
        type: Number,
        default: 0
    },

    weightedScore: {
        type: Number,
        default: 0
    },

    totalScore: {
        type: Number,
        default: 0
    },

    // 建立時間
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    toJSON:{
        virtuals: true,
    }
});

module.exports = schema;
