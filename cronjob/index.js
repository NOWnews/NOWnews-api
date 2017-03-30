
import updateAllHotNews from './updateAllHotNews';

module.exports = async () => {

    await Promise.all([
        updateAllHotNews.start()
    ]);
};