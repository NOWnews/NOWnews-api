import _ from 'lodash';
import models from '../models';
import { htmlToText, removePunctuations } from '../libs';
import searchModels from '../searchModels';

const pickData = (news) => {
    let content = htmlToText(news.content);
    content = removePunctuations(content);
    return {
        newsId: news._id,
        newsSn: news.sn,
        title: news.title,
        shortTitle: news.shortTitle,
        content,
        startedAt: news.startedAt,
        createdAt: news.createdAt || undefined,
        updatedAt: news.updatedAt || undefined,
        CreatedBy: news.CreatedBy,
        status: news.status,
        isTrashed: news.isTrashed
    };
};

module.exports = async () => {

    let limit = 1000;
    let skip = 0;
    let lastLength = 0;


    do {
        let newsList = await models.News.find()
            .lean()
            .limit(limit)
            .skip(skip)
            .sort('-startedAt')
            .execAsync();

        let formatNews = _.map(newsList, (news) => {
            return pickData(news);
        });

        await searchModels.News.createAsync(formatNews);

        skip += limit;
        lastLength = newsList.length;
        console.log(lastLength);
    }
    while (lastLength === limit);

    // let test = await models.News.find()
    //     .limit(100)
    //     .lean()
    //     .execAsync();
    // console.log(test);


    // let foo = await models.News.findOne()
    //     .lean()
    //     .execAsync();

    // foo = pickData(foo);

    // console.log(foo);

    // // console.log(searchModels.News);
    // let searchNews = await searchModels.News.createAsync(foo);

    // console.log(searchNews);

    return process.exit();
};