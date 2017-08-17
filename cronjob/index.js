
import updateAllHotNews from './updateAllHotNews';
import updatePersonalize from './updatePersonalize';
import updateHotKeywords from './updateHotKeywords';
import updateInstantNews from './updateInstantNews';
import updateFirstPageForMobile from './updateFirstPageForMobile';
import updateFirstPageForDesktop from './updateFirstPageForDesktop';
import updateNewestNews from './updateNewestNews';
import updateNewestImages from './updateNewestImages';
import importCNYES from './importCNYES';
import importMNA from './importMNA';

module.exports = async () => {

    await Promise.all([
        updateAllHotNews.start(),
        updatePersonalize.start(),
        updateHotKeywords.start(),
        updateInstantNews.start(),
        updateFirstPageForMobile.start(),
        updateFirstPageForDesktop.start(),
        updateNewestNews.start(),
        updateNewestImages.start(),
        importCNYES.start(),
        importMNA.start()
    ]);
};
