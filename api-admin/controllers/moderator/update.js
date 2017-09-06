
import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:moderator:update');

import { Moderator } from '../../../models';

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let {
        year,
        month,
        schedule,
        UpdatedBy
    } = req.body;

    debug('req.body = %j', req.body);

    try{

        let moderator = await Moderator.findById(id)
            .where('isTrashed').equals(false)
            .execAsync();
        debug('moderator = %j', moderator);

        if(year) {
            moderator.set('year', year);
        }

        if(month) {
            moderator.set('month', month);
        }

        if(schedule) {
            moderator.set('schedule', schedule);
        }

        moderator.UpdatedBy = UpdatedBy;

        let updatedModerator = await moderator.saveAsync();

        return res.json(updatedModerator);
    } catch (err) {
        return next(err);
    };
};