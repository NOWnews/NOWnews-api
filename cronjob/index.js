
import updateAllHotNews from './updateAllHotNews';
import updatePersonalize from './updatePersonalize';
import updateHotKeywords from './updateHotKeywords';
import updateInstantNews from './updateInstantNews';
import updateAllCategoryNews from './updateAllCategoryNews';
import updateNewestNews from './updateNewestNews';
import updateNewestImages from './updateNewestImages';
// import importCNYES from './importCNYES';

module.exports = async () => {

    await Promise.all([
        updateAllHotNews.start(),
        updatePersonalize.start(),
        updateHotKeywords.start(),
        updateInstantNews.start(),
        updateAllCategoryNews.start(),
        updateNewestNews.start(),
        updateNewestImages.start()
        // importCNYES.start()
    ]);
};