
import autoIncrement  from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({
    name: String
});

schema.plugin(autoIncrement);

module.exports = schema;
