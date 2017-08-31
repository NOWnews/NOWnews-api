
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
let Schema = mongoose.Schema;

let schema = new Schema({

    month: {
        type: String,
        default: null
    },

    schedule: {
        day1: {
            type: Array,
            default : []
        },
        day2: {
            type: Array,
            default : []
        },
        day3: {
            type: Array,
            default : []
        },
        day4: {
            type: Array,
            default : []
        },
        day5: {
            type: Array,
            default : []
        },
        day6: {
            type: Array,
            default : []
        },
        day7: {
            type: Array,
            default : []
        },
        day8: {
            type: Array,
            default : []
        },
        day9: {
            type: Array,
            default : []
        },
        day10: {
            type: Array,
            default : []
        },
        day11: {
            type: Array,
            default : []
        },
        day12: {
            type: Array,
            default : []
        },
        day13: {
            type: Array,
            default : []
        },
        day14: {
            type: Array,
            default : []
        },
        day15: {
            type: Array,
            default : []
        },
        day16: {
            type: Array,
            default : []
        },
        day17: {
            type: Array,
            default : []
        },
        day18: {
            type: Array,
            default : []
        },
        day19: {
            type: Array,
            default : []
        },
        day20: {
            type: Array,
            default : []
        },
        day21: {
            type: Array,
            default : []
        },
        day22: {
            type: Array,
            default : []
        },
        day23: {
            type: Array,
            default : []
        },
        day24: {
            type: Array,
            default : []
        },
        day25: {
            type: Array,
            default : []
        },
        day26: {
            type: Array,
            default : []
        },
        day27: {
            type: Array,
            default : []
        },
        day28: {
            type: Array,
            default : []
        },
        day29: {
            type: Array,
            default : []
        },
        day30: {
            type: Array,
            default : []
        },
        day31: {
            type: Array,
            default : []
        }
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

schema.index({
    month: 1
});

schema.index({
    isTrashed: 1
});

schema.virtual('formatCreatedAt').get(function () {
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);

module.exports = schema;
