import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:refreshFbDebugger');

import Promise from 'bluebird';
import axios from 'axios';

module.exports = async (url) => {
    try {
        const options = {
            id: url,
            scrape: true,
            access_token: '132863386747341|TQ6gBA9E40cop1BjDhTCp4fE9wQ'
        };
        await axios.post('https://graph.facebook.com/', options);
        return Promise.resolve();
    } catch (err) {
        // 第三方套件失敗不影響原本 flow
        debug('fb debugger fail', err);
        return Promise.resolve();
    }
};
