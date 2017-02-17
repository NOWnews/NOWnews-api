
import autoIncrement from 'simple-mongoose-autoincrement';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({
    name: String
});

schema.plugin(autoIncrement, { field: 'sn' });

module.exports = schema;
