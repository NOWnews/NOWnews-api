import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getIndexPage');

import { IndexPage } from '../models';
import Promise from 'bluebird';

module.exports = async () => {
    try {

        let indexPage = await IndexPage.findOne()
            .deepPopulate([
                'carousels.MainMenu',
                'carousels.MainPhoto',
                'carousels.MainVideo',
                'specialTopics.MainPhoto',
                'specialChannels.MainPhoto',
                'videos.MainMenu',
                'videos.MainPhoto',
                'videos.MainVideo'
            ])
            .select('carousels specialTopics specialChannels videos MainMenu')
            .execAsync();

        return Promise.resolve(indexPage);
    } catch (err) {
        return Promise.reject(err);
    }
};