
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        default: null
    },

    newsId: {
        type: Schema.Types.ObjectId,
        default: null
    },

    menuId: {
        type: Schema.Types.ObjectId,
        default: null
    },

    action: {
        type: String,
        enum: ['LIKE', 'DISLIKE'],
        default: 'LIKE'
    },

    // 建立時間
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

schema.index({
    newsId: 1,
    userId: 1
});

module.exports = schema;
