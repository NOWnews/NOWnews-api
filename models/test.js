
// import autoIncrement from 'mongoose-auto-increment';
import increment from 'mongoose-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({

    id: {
        type: Number,
        required: true,
    },

    // 姓名
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    }
});

// schema.plugin(autoIncrement.plugin, {
//     model: 'Manager',
//     field: 'sn',
//     startAt: 1,
//     incrementBy: 1
// });

schema.plugin(increment, {
    modelName: 'Test',
    fieldName: 'id',
    start: 1,
    increment: 1,
});

module.exports = mongoose.model('Test', schema);