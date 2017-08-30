
/* api-web/controllers/category/list.js */
News.find()
    .where('MainMenu').equals(ObjectId("560000000000000000000011")) // options
    .where('type').equals('NEWS') // options
    .where('Menus').in([ObjectId("5952d5649c2d7166cb9511de"),ObjectId("5952d6805dc3d766fc1c6d64")]) // options
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .where('startedAt').lte(ISODate("2017-06-29T15:15:00.000Z"))
    .sort('-startedAt')

db.news.createIndex({ MainMenu: 1, type: 1, Menus: 1, status: 1, isTrashed: 1, startedAt: -1 })
db.news.createIndex({ MainMenu: 1, Menus: 1, status: 1, isTrashed: 1, startedAt: -1 })
db.news.createIndex({ status: 1, isTrashed: 1, startedAt: -1 })
db.news.createIndex({ type: 1, status: 1, isTrashed: 1, startedAt: -1 })
db.news.createIndex({ MainMenu: 1, status: 1, isTrashed: 1, startedAt: -1 })
db.news.createIndex({ Menus: 1, status: 1, isTrashed: 1, startedAt: -1 })
db.news.createIndex({ MainMenu: 1, type: 1, status: 1, isTrashed: 1, startedAt: -1 })
db.news.createIndex({ MainMenu: 1, Menus: 1, status: 1, isTrashed: 1, startedAt: -1 })


/* controllers/instant/list.js */
News.find()
    .where('type').equals('NEWS') // options
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .where('startedAt').lte("2017-06-29T15:15:00.000Z")
    .sort('-startedAt')

db.news.createIndex({ type: 1, status: 1, isTrashed: 1, startedAt: -1 })
db.news.createIndex({ status: 1, isTrashed: 1, startedAt: -1 })

/* api-web/controllers/location/list.js */
News.find()
    .where('status').equals('RELEASE')
    .where('location').near({
            center: [25.0337117, 121.5655296],
            maxDistance: 0.0005,
            spherical: true
        })
    .where('isTrashed').equals(false)
    .where('startedAt').lte("2017-06-29T15:15:00.000Z")
    .sort('-startedAt');

db.news.createIndex({ status: 1, location: '2dsphere', isTrashed: 1, startedAt: -1 })

/* api-web/controllers/news/list.js */
News.find()
    .where('MainMenu').equals(ObjectId("560000000000000000000011")) // options
    .where('Author').equals(author) // options
    .where('Menus').in([ObjectId("5952d5649c2d7166cb9511de"),ObjectId("5952d6805dc3d766fc1c6d64")]) // options
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .where('startedAt').lte(Date.now())
    .sort('-startedAt')

db.news.createIndex({ Author: 1, status: 1, isTrashed: 1, startedAt: -1 })

/* api-web/controllers/rss/list.js */
News.find()
    .where('startedAt').lte(Date.now())
    .where('startedAt').gte(start) // options
    .where('startedAt').lte(start) // options
    .where('MainMenu').in(objectIds)
    .where('isDeliver').equals(true) // options
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .sort('-startedAt')

db.news.createIndex({ startedAt: -1, startedAt: 1, MainMenu: 1, isDeliver: 1, status: 1, isTrashed: 1 })

/* api-web/controllers/search/list.js */
News.find()
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .where('startedAt').gte(startedAt)
    .or([
        { title: new RegExp(keyword, 'i') },
        { content: new RegExp(keyword, 'i') }
    ])
    .sort('-startedAt')

db.news.createIndex({ title: 'text', content: 'text', status: 1, isTrashed: 1, startedAt: -1 })

/* api-web/controllers/sitemap/googleSSL.js */
News.find()
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .where('startedAt').lte(Date.now())
    .where('startedAt').gte(moment.tz('Asia/Taipei').add('-3', 'day'))
    .select('startedAt sn')
    .sort('-startedAt');

db.news.createIndex({ startedAt: -1, startedAt: 1, status: 1, isTrashed: 1 })

/* libs/getNewsBySn.js */
News.findOne()
    .where('sn').equals(sn)
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .where('startedAt').lte(Date.now())

db.news.createIndex({ sn: 1, status: 1, isTrashed: 1, startedAt: 1 })

/* libs/getNextNewsBySn.js */
News.find()
    .where('sn').gt(sn)
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .where('startedAt').lte(Date.now())
    .sort('sn')

db.news.createIndex({ sn: 1, status: 1, isTrashed: 1, startedAt: 1 })

/* libs/getPrevNewsBySn.js */
News.find()
    .where('sn').lt(sn)
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .where('startedAt').lte(Date.now())
    .sort('-sn')

db.news.createIndex({ sn: -1, status: 1, isTrashed: 1, startedAt: -1 })

/* libs/getRelationNewsBySn */
News.find()
    .where('Tags').in(news.Tags)
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .where('sn').ne(sn)
    .where('startedAt').lte(Date.now())
    .sort('-startedAt')

db.news.createIndex({ Tags: 1, status: 1, isTrashed: 1, sn: 1, startedAt: -1 })





News.find()
    .where('startedAt').lte(Date.now())
    .where('startedAt').gte(moment.tz('Asia/Taipei').add(-1, 'day'))
    .where('MainMenu').equals(menu._id) // options
    .where('Menus').equals(menu._id) // options
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)

db.news.createIndex({ startedAt: -1, startedAt: 1, MainMenu: 1, status: 1, isTrashed: 1 })
db.news.createIndex({ startedAt: -1, startedAt: 1, Menus: 1, status: 1, isTrashed: 1 })



db.news.createIndex({ id: 1, isTrashed: 1 })

/* api-admin/controllers/score/list.js */
News.find()
    .where('startedAt').gte(startedAt)
    .where('startedAt').lte(endedAt)
    .or([
        { MainMenu: menuId },
        { Menus: menuId }
    ])
    .where('status').equals('RELEASE')
    .where('isTrashed').equals(false)
    .sort('-startedAt')

db.news.createIndex({ startedAt: 1, startedAt: -1, MainMenu: 1, status: 1, isTrashed: 1 })
db.news.createIndex({ startedAt: 1, startedAt: -1, Menus: 1, status: 1, isTrashed: 1 })

/* api-admin/controllers/statistics/centers.js */
News.find()
    .where('CreatedBy').in(userIds)
    .where('isTrashed').equals(false)
    .where('startedAt').gte(startedAt)
    .where('startedAt').lte(endedAt)

db.news.createIndex({ CreatedBy: 1, isTrashed: 1, startedAt: 1, startedAt: -1 })

/* api-admin/controllers/news/list.js */
News.find()
    .where('title').equals(new RegExp(title, 'i'))
    .where('type').equals(type)
    .where('status').equals(status)
    .where('Author').equals(Author)
    .where('CreatedBy').equals(CreatedBy)
    .where('UpdatedBy').equals(UpdatedBy)
    .where('LastReviewer').equals(LastReviewer)
    .where('startedAt').gte(moment.tz(startedAt, 'Asia/Taipei').startOf('day'))
    .where('startedAt').lte(moment.tz(endedAt, 'Asia/Taipei').endOf('day'))
    .where('MainMenu').equals(MainMenu)
    .where('sn').equals(sn)
    .where('isTrashed').equals(false)
    .sort('-createdAt')
    .sort('startedAt')

db.news.createIndex({ sn: 1, CreatedBy: 1, MainMenu: 1, status: 1, startedAt: 1 })
db.news.createIndex({ CreatedBy: 1, startedAt: -1 })
db.news.createIndex({ CreatedBy: 1, status: 1, startedAt: -1 })
db.news.createIndex({ LastReviewer: 1, status: 1, startedAt: -1 })


/* api-admin/controllers/image/list.js */

程式碼
```
Image.find()
    .where('isTrashed').equals(false)
    .where('type').equals(type)
    .where('imageFrom').equals(imageFrom)
    .where('createdAt').gte(moment.tz(startedAt, 'Asia/Taipei').startOf('day'))
    .where('createdAt').lte(moment.tz(endedAt, 'Asia/Taipei').endOf('day'))
    .or([
        { $and: [{ title: /見面會/i }] }, 
        { $and: [{ desc: /見面會/i }] }, 
        { $and: [{ keyword: /見面會/i }] }
    ]);

```

實際 Query
```
db.getCollection('images').find(
{
    isTrashed: false,
    type: 'NEWS', 
    createdAt: {
        $gte: ISODate("2017-06-28T00:00:00.0Z"),
        $lt: ISODate("2017-08-29T00:00:00.0Z")
    },
    imageFrom: 'INTERNAL',
    '$or': [ { '$and': [ { title: /見面會/i } ] }, { '$and': [ { desc: /見面會/i } ] }, { '$and': [ { keyword: /見面會/i } ] } ]
}).explain('executionStats');
```

建立 index
```
db.images.createIndex({
    createdAt: -1,
    imageFrom: 1,
    type: 1,
    isTrashed: 1
})
```
