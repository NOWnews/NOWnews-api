
import hashPwd from './hashPwd';
import pagination from './pagination';
import newsLog from './newsLog';
import getIndexPage from './getIndexPage';
import getNewsBySn from './getNewsBySn';
import getRelationNewsBySn from './getRelationNewsBySn';
import getNextNewsBySn from './getNextNewsBySn';
import getPrevNewsBySn from './getPrevNewsBySn';
import updateAllHotNews from './updateAllHotNews';
import updateAllCategoryNews from './updateAllCategoryNews';
import updateNotNewsByMenuId from './updateNotNewsByMenuId';
import updatePersonalize from './updatePersonalize';
import updateHotKeywords from './updateHotKeywords';
import updateInstantNews from './updateInstantNews';
import updateNewestNews from './updateNewestNews';
import refreshIndexPage from './refreshIndexPage';
import parseRssFeed from './parseRssFeed';

module.exports = {
    hashPwd,
    pagination,
    newsLog,
    getIndexPage,
    getNewsBySn,
    getRelationNewsBySn,
    getNextNewsBySn,
    getPrevNewsBySn,
    updateAllHotNews,
    updateAllCategoryNews,
    updateNotNewsByMenuId,
    updatePersonalize,
    updateHotKeywords,
    updateInstantNews,
    updateNewestNews,
    refreshIndexPage,
    parseRssFeed
};