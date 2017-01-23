
import Debug from 'debug';
const debug = Debug('NOWnews-api:api:controllers:policy:group');

import _ from 'lodash';

import { Policy } from '../../../models';

module.exports = async (req, res, next) => {
    try {
        let groups = await Policy.aggregateAsync([
                {
                    $group: {
                        _id: '$group',
                        policies: { 
                            '$push': { 
                                _id: '$_id',
                                group: '$group',
                                desc: '$desc',
                                type: '$type',
                                method: '$method',
                                path: '$path'
                            }
                        }
                    }
                }
            ]);

        debug('groups = %j', groups);
        return res.json(groups);
    }catch(err) {
        return next(err);
    }
};