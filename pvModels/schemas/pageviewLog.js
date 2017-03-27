
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    cookie: {
        type: String,
        default: null
    },

    userId: {
        type: Schema.Types.ObjectId,
        default: null
    },

    url: {
        type: String,
        default: null,
        trim: true,
        lowercase: true
    },

    queryString: {
        type: String,
        default: null
    },

    menuId: {
        type: Schema.Types.ObjectId,
        default: null
    },

    title: {
        type: String,
        default: null
    },

    platform: {
        type: String,
        default: null,
        trim: true,
        uppercase: true
    },

    browser: {
        type: String,
        default: null,
        trim: true,
        uppercase: true
    },

    userAgent: {
        type: String
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

schema.plugin(autoIncrement);

module.exports = schema;
