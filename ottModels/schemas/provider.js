
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import DeepPopulate from 'mongoose-deep-populate';
let deepPopulate = DeepPopulate(mongoose);
let Schema = mongoose.Schema;

let schema = new Schema({

    platform: {
        type: String,
        enum: ['NOWNEWS', 'WATCHNOW', 'NOWLINK']
    },

    watchTime: {
        type: Number,
        default: 20
    },

    lockTime: {
        type: Number,
        default: 30
    },

    watchable: {
        type: Boolean,
        default: true
    },

    icon: {
        type: String,
        default: ''
    },

    titleMessage: {
        type: String,
        default: ''
    },

    downloadable: {
        type: Boolean,
        default: false
    },

    iosDownloadLink: {
        type: String,
        default: ''
    },

    androidDownloadLink: {
        type: String,
        default: ''
    },

    videoAD: {
        type: Boolean,
        default: true
    },

    data: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],

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
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);
schema.plugin(deepPopulate, {
    populate: {
        'data': {
            options: {
                sort: { weight: -1 }
            }
        },
        'data.channels': {
            options: {
                sort: { weight: -1 }
            }
        }
    }
});

module.exports = schema;
