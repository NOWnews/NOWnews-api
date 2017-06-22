import DeepPopulate from 'mongoose-deep-populate';
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;
let deepPopulate = DeepPopulate(mongoose);

let schema = new Schema({

    // 特輯的標題
    title: {
        type: String,
        required: true
    },

    // 特輯的主圖
    MainPhoto: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        default: null
    },

    // 特輯的新聞列表
    newsList: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'News',
        }],
    },

    // 特輯的 Tag
    Tag: {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        default: null
    },

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
    return moment.tz(this.createdAt,'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt,'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);

schema.plugin(deepPopulate, {
    populate: {
        'newsList.MainMenu': {
            select: 'name'
        },
        'newsList.MainPhoto': {
            select: 'url'
        }
    }
});

module.exports = schema;
