
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    newsId: {

    }

    queryString: {

    },

    menuId: {

    },

    title: {

    },

    



    newsId: {
        type: Schema.Types.ObjectId,
        required: true
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
    return (this.pageviews * 0.3) + (this.temperatures * 0.5) + (this.weightedScore * 0.2);
});

schema.plugin(autoIncrement);

module.exports = schema;
