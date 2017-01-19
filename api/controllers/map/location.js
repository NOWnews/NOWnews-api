
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:map:location');

import axios from 'axios';
import config from 'config';

import { News } from '../../../models';

module.exports = async (req, res, next) => {

    let { address, latlng } = req.query;
    let geoKey = config.get('apiKeys.geocode');
    let geoUrl = config.get('apiUrls.geocode');
    let result;

    try {

        let options = {
            params: {
                language: 'zh-TW',
                key: geoKey
            }
        };

        if(address) {
            options.params.address = address
        }

        if(latlng) {
            options.params.latlng = latlng;
        }

        debug('geo api url = %s', geoUrl);
        debug('options = %j', options);

        let { data: geoData } = await axios.get(geoUrl, options);
        debug('geoData = %j', geoData);

        let location = geoData.results[0];

        if(address) {
            result = [location.geometry.location.lat, location.geometry.location.lng];
        }

        if(latlng) {
            result = location.address_components;
        }

        return res.json(result);
    }catch(err) {
        return next(err);
    }
};