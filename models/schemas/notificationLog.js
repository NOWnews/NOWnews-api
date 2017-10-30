
import mongoose from 'mongoose';
import moment from 'moment-timezone';

let Schema = mongoose.Schema;

let schema = new Schema({

    NewsId: {
        type: Schema.Types.ObjectId,
        ref: 'News'
    },

    title: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    summary: {
        type: String,
    },

    os: {
        type: String,
        required: true,
        enum: ['IOS', 'ANDROID', 'WEB']
    },
    // 預期數量
    expectCount: {
        type: Number,
        required: true,
    },
    // 成功數量
    successCount: {
        type: Number,
        required: true,
    },
    // 建立者
    CreatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // 建立時間
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false,
    toJSON:{
        virtuals: true,
    }
});

schema.index({
    createdAt: 1,
    os: 1
});


schema.virtual('formatCreatedAt').get(function () {
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

module.exports = schema;
