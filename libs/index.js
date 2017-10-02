import hashPwd from './hashPwd';
import pagination from './pagination';
import newsLog from './newsLog';
import getIndexPage from './getIndexPage';
import getNewsBySn from './getNewsBySn';
import getRelationNewsBySn from './getRelationNewsBySn';
import getNextNewsByNews from './getNextNewsByNews';
import getPrevNewsByNews from './getPrevNewsByNews';
import updateAllHotNews from './updateAllHotNews';
import updateCategoryFirstPage from './updateCategoryFirstPage';
import updateFirstPageForMobile from './updateFirstPageForMobile';
import updateFirstPageForDesktop from './updateFirstPageForDesktop';
import updateNotNewsByMenuId from './updateNotNewsByMenuId';
import updatePersonalize from './updatePersonalize';
import updateHotKeywords from './updateHotKeywords';
import updateInstantNews from './updateInstantNews';
import updateNewestNews from './updateNewestNews';
import updateNewestImages from './updateNewestImages';
import refreshFbDebugger from './refreshFbDebugger';
import refreshIndexPage from './refreshIndexPage';
import parseRssFeed from './parseRssFeed';
import changeInternalLink from './changeInternalLink';
import getAndRemoveFirstImage from './getAndRemoveFirstImage';
import getChannelsByPlatform from './getChannelsByPlatform';
import getFacebookPostInfo from './getFacebookPostInfo';
import downloadFile from './downloadFile';

module.exports = {
    hashPwd,
    pagination,
    newsLog,
    getIndexPage,
    getNewsBySn,
    getRelationNewsBySn,
    getNextNewsByNews,
    getPrevNewsByNews,
    updateAllHotNews,
    updateCategoryFirstPage,
    updateFirstPageForMobile,
    updateFirstPageForDesktop,
    updateNotNewsByMenuId,
    updatePersonalize,
    updateHotKeywords,
    updateInstantNews,
    updateNewestNews,
    updateNewestImages,
    refreshFbDebugger,
    refreshIndexPage,
    parseRssFeed,
    changeInternalLink,
    getAndRemoveFirstImage,
    getChannelsByPlatform,
    getFacebookPostInfo,
    downloadFile
};
