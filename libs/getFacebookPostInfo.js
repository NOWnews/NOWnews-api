import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getFacebookPostInfo');

import Promise from 'bluebird';
import axios from 'axios';

module.exports = async (url) => {
    try {

        let facebookToken = '132863386747341%257CTQ6gBA9E40cop1BjDhTCp4fE9wQ';
        let graphUrl = `https://graph.facebook.com/v2.10/?id=${url}&fields=engagement&access_token=${facebookToken}`;

        let { data: result } = await axios.get(graphUrl);
        debug('facebook post feed = %j', result);

        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
};