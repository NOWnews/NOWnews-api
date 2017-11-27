import cleanInvalidToken from './cleanInvalidToken';
import hashPwd from './hashPwd';
import initFirebase from './initFirebase';
import pagination from './pagination';
import newsLog from './newsLog';
import getIndexPage from './getIndexPage';
import getNewsBySn from './getNewsBySn';
import getNewsById from './getNewsById';
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
import updateBig5Small5 from './updateBig5Small5';
import refreshFbDebugger from './refreshFbDebugger';
import refreshIndexPage from './refreshIndexPage';
import parseRssFeed from './parseRssFeed';
import changeInternalLink from './changeInternalLink';
import getAndRemoveFirstImage from './getAndRemoveFirstImage';
import getChannelsByPlatform from './getChannelsByPlatform';
import getFacebookPostInfo from './getFacebookPostInfo';
import downloadFile from './downloadFile';
import htmlToText from './htmlToText';
import prepareImages from './prepareImages';

module.exports = {
    cleanInvalidToken,
    hashPwd,
    initFirebase,
    pagination,
    newsLog,
    getIndexPage,
    getNewsBySn,
    getNewsById,
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
    updateBig5Small5,
    refreshFbDebugger,
    refreshIndexPage,
    parseRssFeed,
    changeInternalLink,
    getAndRemoveFirstImage,
    getChannelsByPlatform,
    getFacebookPostInfo,
    downloadFile,
    htmlToText,
    prepareImages
};
