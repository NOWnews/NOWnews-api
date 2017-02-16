
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import autoIncrement from 'mongoose-auto-increment';

let Schema = mongoose.Schema;

let schema = new Schema({

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        default: 'NEWS',
        enum: ['NEWS', 'IMAGE']
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

schema.index({ name: 1 });

schema.virtual('formatCreatedAt').get(function () {
    return moment(this.createdAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment(this.updatedAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement.plugin, {
    model: 'NewsLog',
    field: 'sn',
    startAt: 1,
    incrementBy: 1
});

module.exports = schema;
