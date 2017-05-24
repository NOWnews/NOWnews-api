
import updateAllHotNews from './updateAllHotNews';
import updatePersonalize from './updatePersonalize';

module.exports = async () => {

    await Promise.all([
        updateAllHotNews.start(),
        updatePersonalize.start()
    ]);
};