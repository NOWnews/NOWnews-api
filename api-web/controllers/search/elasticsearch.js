import _ from 'lodash';
import Debug from 'debug';
import elasticsearch from '../../../elasticsearch';
import formatImage from '../../../libs/formatImage';
const debug = Debug('NOWnews-api:api-web:controllers:search:elasticsearch');

module.exports = async (req, res, next) => {
    try {
        let { keyword } = req.params;
        let { limit, skip, page, startedAt, endedAt, timeRange } = req.query;
        
        const sortKey = { _score: 'desc' };
        const result = await elasticsearch.search({
           index: 'nownews',
           type: 'news',
           body: {
               sort: sortKey,
               from: skip,
               size: limit,
               query: {
                 multi_match: {
                   query: keyword,
                   type: 'best_fields',
                   fields: [
                     'title',
                     'summary',
                     'Tags'
                   ],
                   tie_breaker: 0.3,
                   minimum_should_match: '100%'
                 }
               },
               highlight: {
                 fields: {
                   title: {},
                   summary: {}
                 }
               }
           }
        });

        // Format newsList
        const newsList = _.map(result.hits.hits, (data) => {
          const {
            sn, title, shortTitle, MainPhoto, MainMenu,
            url, startedAt
          } = data._source;

          return {
            completeUrl: url,
            parseUrl: url.split('https://www.nownews.com')[1],
            shortTitle,
            sn,
            startedAt,
            title,
            type: 'NEWS',
            MainMenu: {
              name: MainMenu && MainMenu[0]
            },
            MainPhoto: {
              url: MainPhoto,
              desc: '',
              thumbnail: formatImage.thumbnail(MainPhoto),
              googleCDN: formatImage.googleCDN(MainPhoto),
              sizeFormat: formatImage.sizeFormat(MainPhoto)
            },
            MainVideo: null,
            url
          }
        });

        // Format PageData
        const total = result.hits.total;
        const totalPage = Math.ceil(total/limit);
        const hasNext = totalPage !== page;
        const pageData = {
          total,
          totalPage,
          currentPage: page,
          hasNext,
          nextPage: hasNext ? page + 1 : 0,
          hasPrev: page > 1,
          prevPage: page - 1,
          skip,
          limit
        };
        return res.json({ newsList, pageData });
    } catch(err) {
        return next(err);
    }
};