import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({
    rules: {
        'excludeRoles': {
            isOn: {
                type: Schema.Types.Boolean,
                require: true,
                default: false
            },
            setting: {
                roleIds: [{
                    type: Schema.Types.String,
                    default: []
                }]
            }

        },
        'timeAndRole': {
            isOn: {
                type: Schema.Types.Boolean,
                require: true,
                default: false
            },
            setting: [{
                centerId: {
                    type: Schema.Types.String,
                },
                roleIds: [{
                    type: Schema.Types.String,
                }],
                startHour: {
                    type: Schema.Types.String
                },
                startMinute: {
                    type: Schema.Types.String
                },
                endHour: {
                    type: Schema.Types.String
                },
                endMinute: {
                    type: Schema.Types.String
                }
            }]
        },
        'sameCenter': {
            isOn: {
                type: Schema.Types.Boolean,
                require: true,
                default: false
            }
        },
        'sameUser': {
            isOn: {
                type: Schema.Types.Boolean,
                require: true,
                default: true
            }
        }

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
    toJSON: {
        virtuals: true,
    }
});

schema.virtual('formatCreatedAt').get(function() {
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function() {
    return moment.tz(this.updatedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

module.exports = schema;