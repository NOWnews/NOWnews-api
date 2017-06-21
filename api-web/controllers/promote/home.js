import axios from 'axios';
import config from 'config';
import _ from 'lodash';
import Promise from 'bluebird';

const adServ = config.get('web.adServ');

module.exports = async (req, res, next) => {
    try {
        // const result = await Promise.all([
        // ]);

        return res.json({
        });
    } catch (err) {
        return next(err);
    }
};
