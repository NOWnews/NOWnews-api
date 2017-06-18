import json
from pymongo import MongoClient
from bson import json_util, ObjectId
import datetime

uri = "mongodb://127.0.0.1:27017" 
client = MongoClient(uri)

db = client['production']
collect = db['fields_current.node']

records = []
category = {
    '政治': '560000000000000000000001', 
    '財經': '560000000000000000000002', 
    '生活': '560000000000000000000003', 
    '社會': '560000000000000000000004',
    '運動': '560000000000000000000005',
    '娛樂': '560000000000000000000006',
    '國際': '560000000000000000000007',
    '大陸': '560000000000000000000008',
    '新奇': '560000000000000000000009',
    '消費': '560000000000000000000010',
    '地方': '560000000000000000000011',
    '科技': '560000000000000000000012',
    '鉅亨網': '560000000000000000000013',
    '中央社': '560000000000000000000014',
    '軍聞社': '560000000000000000000015'
}

counter = 1
for post in collect.find({ '_bundle': 'news', 'field_release_status.value': 1}).sort("_id", 1).limit(1):
    title = post['title']
    body = post['body'] if 'body' in post else None
    shortTitle = post['field_short_title'] if 'field_short_title' in post else None
    author = post['field_newsby'] if 'field_newsby' in post else None
    isAdult = post['field_adult'] if 'field_adult' in post else None
    status = 'RELEASE'
    freeContent = post['field_free_body'] if 'field_free_body' in post else None
    createdAt = post['field_release_date'] if 'field_release_date' in post else None
    updatedAt = post['changed'] if 'changed' in post else None
    newsBy = post['field_newsby'] if 'field_newsby' in post else None

    # check fucking body type...
    body = body[0] if type(body) is list else body
    summary = ''
    content = ''
    try:
        summary = body['summary'] if body is not None else ''
    except KeyError:
        summary = ''
    try:
        content = body['value'] if body is not None else ''
    except KeyError:
        content = ''
    # insert data
    news = {}
    news['sn'] = post['_id']
    news['type'] = 'NEWS'
    news['title'] = title
    news['summary'] = summary
    news['content'] = content
    news['shortTitle'] = shortTitle['value'] if shortTitle is not None else ''
    # news['author'] = author['value'] if author is not None else ''
    news['Author'] = ObjectId('530000000000000000000002')
    # news['isAdult'] = isAdult['value'] if isAdult is not None else ''
    try:
        news['isAdult'] = False if isAdult['value'] == "0" else True
    except:
        news['isAdult'] = False
    news['status'] = status
    news['freeContent'] = freeContent['value'] if freeContent is not None else ''
    news['createdAt'] = datetime.datetime.utcfromtimestamp(float(createdAt['value'])) if createdAt is not None else ''
    news['updatedAt'] = datetime.datetime.utcfromtimestamp(float(updatedAt))if updatedAt is not None else ''
    news['MainMenu'] = None
    news['Menus'] = []
    news['MainPhoto'] = None
    news['MainVideo'] = None
    news['Photos'] = []
    news['Videos'] = []
    news['traceCode'] = None
    news['isDeliver'] = False
    news['isSponsored'] = False
    news['newsBy'] = newsBy['value'] if newsBy is not None else ''
    news['isFeed'] = True
    news['isTrashed'] = False
    news['LastReviewer'] = ObjectId('530000000000000000000002')
    news['CreatedBy'] = ObjectId('530000000000000000000002')
    news['UpdatedBy'] = ObjectId('530000000000000000000002')

    tids = []
    keywords = ''
    if 'field_free_tags' in post: 
        # print(post['field_free_tags'][:2])
        # tids = post['field_free_tags']
        if post['field_free_tags'] is not None:
            for obj in post['field_free_tags']:
                if obj:
                    tids.append(obj['tid'])
    # tids = post['field_free_tags']
    # find news keyword
    taxonomy = db['fields_current.taxonomy_term']
    for keyword in taxonomy.find({ '_id': {'$in': tids}}, { '_id': 1, 'name': 1 }):
        # print(keyword)
        if keyword['name'] in category:
            keywords = ObjectId(category[keyword['name']])
            break
        else:
            continue
    news['Tags'] = keywords
    news['MainMenu'] = keywords
    file_name = 'news_' + str(int(counter / 1000)) + '.json'
    print(json_util.dumps(news, ensure_ascii=False), file = open(file_name, 'a'))
    counter += 1
