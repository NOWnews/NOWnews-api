
import Promise from 'bluebird';
import { News } from '../searchModels';

module.exports = async (news) => {
    try {
        let result = await News.removeAsync({ newsId: news._id });
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
};