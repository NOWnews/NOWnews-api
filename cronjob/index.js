import cleanInvalidToken from './cleanInvalidToken';
import updateAllHotNews from './updateAllHotNews';
import updatePersonalize from './updatePersonalize';
import updateHotKeywords from './updateHotKeywords';
import updateInstantNews from './updateInstantNews';
import updateFirstPageForMobile from './updateFirstPageForMobile';
import updateFirstPageForDesktop from './updateFirstPageForDesktop';
import updateNewestNews from './updateNewestNews';
import updateNewestImages from './updateNewestImages';
import updateBig5Small5 from './updateBig5Small5';
import importMNA from './importMNA';
import importCnaImages from './importCnaImages';
import importCnaNews from './importCnaNews';
import importCNYES from './importCNYES';

module.exports = async () => {

    await Promise.all([
        cleanInvalidToken.start(),
        updateAllHotNews.start(),
        updatePersonalize.start(),
        updateHotKeywords.start(),
        updateInstantNews.start(),
        updateFirstPageForMobile.start(),
        updateFirstPageForDesktop.start(),
        updateNewestNews.start(),
        updateNewestImages.start(),
        updateBig5Small5.start(),
        importMNA.start(),
        importCnaImages.start(),
        importCnaNews.start(),
        importCNYES.start()
    ]);
};
