
import DeepPopulate from 'mongoose-deep-populate';
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';

let Schema = mongoose.Schema;
let deepPopulate = DeepPopulate(mongoose);

let schema = new Schema({

    // 稿單標題
    title: {
        type: String,
        required: true,
        trim: true
    },

    // 稿單分類
    Center: {
        type: Schema.Types.ObjectId,
        ref: 'Center',
        default: null
    },

    // 稿單內容
    content: {
        type: String,
        default: null
    },

    //留言
    comments : {
        type: Array,
        default : []
    },

    // 新聞時間
    startedAt: {
        type: Date,
        default: Date.now,
        set: (time) => { return moment(time); }
    },

    // 是否被刪除
    isTrashed: {
        type: Boolean,
        default: false
    },

    // 建立者
    CreatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // 更新者
    UpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

schema.virtual('formatCreatedAt').get(function () {
    return moment(this.createdAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment(this.updatedAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatStartedAt').get(function () {
    return moment(this.startedAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);
schema.plugin(deepPopulate);

module.exports = schema;
