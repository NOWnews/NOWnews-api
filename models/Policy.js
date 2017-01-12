
import autoIncrement from 'mongoose-sequence';
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
        enum: ['API', 'ADMIN'],
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

schema.plugin(autoIncrement, {
    collection_name: 'SerialNumberCounter',
    inc_field: 'sn',
    id: 'policy_sn'
});

module.exports = mongoose.model('Policy', schema);