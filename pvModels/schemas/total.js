
import { autoIncrement } from '../../libs';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({
    name: String
});

schema.plugin(autoIncrement, { field: 'sn' });

module.exports = schema;
