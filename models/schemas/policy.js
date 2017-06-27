
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    group: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        default: ''
    },

    // 類型
    type: {
        type: String,
        enum: ['API', 'ADMIN', 'ADMIN_MENU'],
        default: 'ADMIN'
    },

    method: {
        type: String,
        enum: ['get', 'post', 'put', 'delete']
    },

    // 路徑
    path: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
});

schema.plugin(autoIncrement);

module.exports = schema;
