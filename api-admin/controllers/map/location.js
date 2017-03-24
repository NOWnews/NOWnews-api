
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:map:location');

import axios from 'axios';
import config from 'config';

import { News } from '../../../models';

module.exports = async (req, res, next) => {

    let { address, latlng } = req.query;
    let geoKey = config.get('admin.apiKeys.geocode');
    let geoUrl = config.get('admin.apiUrls.geocode');

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

        let result = {
            address: location.formatted_address,
            location: [location.geometry.location.lng, location.geometry.location.lat] // [ lng, lat ]
        }

        return res.json(result);
    }catch(err) {
        return next(err);
    }
};