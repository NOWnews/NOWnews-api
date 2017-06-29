
import autoIncrement from 'mongoose-easy-auto-increment';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import Promise from 'bluebird';

let Schema = mongoose.Schema;

let schema = new Schema({

    // 選單名稱
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 6
    },

    // 分類名稱
    categoryName: {
        type: String,
        trim: true,
        default: null,
        lowercase: true
    },

    // 選單連結
    url: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    // 是否為外部連結
    isExternal: {
        type: Boolean,
        default: false
    },

    // 是否為成人
    isAdult: {
        type: Boolean,
        default: false
    },

    // 是否有子層
    hasChild: {
        type: Boolean,
        default: false
    },

    // 父層的 id
    ParentId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        default: null
    },

    // 層數
    level: {
        type: Number,
        default: 0
    },

    // 權重
    weight: {
        type: Number,
        default: 0
    },

    // 開始時間
    startedAt: {
        type: Date,
        default: null
    },

    // 結束時間
    endedAt: {
        type: Date,
        default: null
    },

    // 沒有走期的連結
    isPermanented: {
        type: Boolean,
        default: true
    },

    // 狀態
    status: {
        type: String,
        enum: ['OPEN','CLOSE'],
        default: 'OPEN'
    },

    // 版型
    template: {
        type: String,
        default: 'NORMAN',
        enum: ['NORMAN', 'COLUMN']
    },

    // 版型的廣告代碼，0 是預設廣告代碼
    templateAD: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },

    // 是否被刪除
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
    isTrashed: 1,
    level: 1,
    status: 1
});

schema.index({
    _id: 1,
    isTrashed: 1
});

schema.index({
    isTrashed: 1,
    categoryName: 1,
    status: 1
});

schema.index({
    isTrashed: 1,
    level: 1,
    name: 1
});

schema.index({
    isTrashed: 1
});

// 給 Admin 用的 Menu 結構化資料
schema.statics.findAdminStructionAsync = async function (){
    let self = this;

    let mainMenus = await self.find()
        .where('isTrashed').equals(false)
        .where('level').equals(0)
        .sort('weight')
        .lean()
        .execAsync();

    // 第二層選單
    let menuData = await Promise.mapSeries(mainMenus, (mainMenu) => {
        return self.find()
            .where('ParentId').equals(mainMenu._id)
            .where('level').equals(1)
            .where('isTrashed').equals(false)
            .sort('weight')
            .lean()
            .execAsync()
            .then((docs) => {
                mainMenu.child = docs;
                return Promise.resolve(mainMenu);
            });
    });

    return Promise.resolve(menuData);
};

// 給 Web 用的 Menu 結構化資料
schema.statics.findWebStructionAsync = async function (){
    let self = this;

    let mainMenus = await self.find()
        .where('isTrashed').equals(false)
        .where('level').equals(0)
        .where('status').equals('OPEN')
        .or([
            { isPermanented: true },
            { $and: [
                { startedAt: { $lte: Date.now() }},
                { endedAt: { $gte: Date.now() }}
            ]}
        ])
        .sort('weight')
        .lean()
        .execAsync();

    // 第二層選單
    let menuData = await Promise.mapSeries(mainMenus, (mainMenu) => {
        return self.find()
            .where('ParentId').equals(mainMenu._id)
            .where('level').equals(1)
            .where('isTrashed').equals(false)
            .where('status').equals('OPEN')
            .or([
                { isPermanented: true },
                { $and: [
                    { startedAt: { $lte: Date.now() }},
                    { endedAt: { $gte: Date.now() }}
                ]}
            ])
            .sort('weight')
            .lean()
            .execAsync()
            .then((docs) => {
                mainMenu.child = docs;
                return Promise.resolve(mainMenu);
            });
    });

    return Promise.resolve(menuData);
};

schema.virtual('formatCreatedAt').get(function () {
    return moment.tz(this.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.virtual('formatUpdatedAt').get(function () {
    return moment.tz(this.updatedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
});

schema.plugin(autoIncrement);

module.exports = schema;
