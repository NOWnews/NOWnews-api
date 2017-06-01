
import updateAllHotNews from './updateAllHotNews';
import updatePersonalize from './updatePersonalize';
import updateHotKeywords from './updateHotKeywords';

module.exports = async () => {

    await Promise.all([
        updateAllHotNews.start(),
        updatePersonalize.start(),
        updateHotKeywords.start()
    ]);
};