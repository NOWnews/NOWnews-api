
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({

    newsId: {
        type: Schema.Types.ObjectId
    },

    newsSn: {
        type: Number
    },

    title: {
        type: String
    },

    shortTitle: {
        type: String
    },

    content: {
        type: String
    },

    status: {
        type: String
    },

    isTrashed: {
        type: Boolean
    },

    startedAt: {
        type: Date,
    },

    // 建立時間
    createdAt: {
        type: Date
    },

    // 更新時間
    updatedAt: {
        type: Date
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
    newsId: 1
});

schema.index({
    newsSn: 1
});

schema.index({
    startedAt: -1
});

schema.index({
    title: 'text',
    shortTitle: 'text',
    content: 'text',
    status: 1,
    isTrashed: 1,
    startedAt: -1
}, { sparse: true });


schema.virtual('formatCreatedAt').get(function () {
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

module.exports = schema;
