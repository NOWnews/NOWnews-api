
module.exports = (schema, options) => {

    // 預設的 field 與要存的 collection
    let fieldName = 'sn';
    let collection = 'SerialNumberCounters';

    // 如果 options 有帶入的話，則用 options 帶入的值
    if (options && options.field) {
        fieldName = options.field;
    }

    if (options && options.collection) {
        collection = options.collection;
    }


    let field = {};
    field[fieldName] = {
        type: Number,
        index: true,
        unique: true
    };

    schema.add(field);

    schema.pre('save', function (next) {
        let doc = this;
        if(doc.db && doc.isNew && doc[fieldName] === undefined) {
            let db = doc.db.db;
            let collectionName = doc.collection.name;

            db.collection(collection).findOneAndUpdate(
                {
                    _id: collectionName
                },
                {
                    $inc: { seq: 1 }
                },
                {
                    returnOriginal: false,
                    upsert: true
                },
                function(err, result) {
                    if(err) {
                        return next(err);
                    }
                    doc[fieldName] = result.value.seq;
                    return next();
                }
            );
        }
    });
};