
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let config = require('config');

let schema = new Schema({

    newsId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    // 瀏覽數
    pageviews: {
        type: Number,
        default: 0
    },

    // 溫度計
    temperatures: {
        type: Number,
        default: 0
    },

    // 後台加權分數
    weightedScore: {
        type: Number,
        default: 0
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

schema.virtual('totalScore').get(function () {
    return (this.pageviews * config.get('weightRatio.pageviews')) + (this.temperatures * config.get('weightRatio.temperatures')) + (this.weightedScore * config.get('weightRatio.weightedScore'));
});

schema.plugin(autoIncrement);

module.exports = schema;
