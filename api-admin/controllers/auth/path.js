import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:auth:path');
import _ from 'lodash';
import { Role } from '../../../models';

module.exports = async (req, res, next) => {

    let { roleid, path } = req.query;
    try {
            if( roleid && path ){
                let role = await Role.findById(roleid)
                .populate('Policies');

                if(role.Policies.length ===0 ){
                    return res.json(false);
                }

                _.map(role.Policies,(policy)=>{
                    if(policy.type === 'ADMIN' && policy.path === path){
                        return res.send(true);
                    }
                });

                return res.send(false);
            }

        return res.json({});


        // let dailyPlan = await cursor
        //     .deepPopulate('CreatedBy.Avatar messages.User.Avatar')
        //     .execAsync();
        // debug('dailyPlan = %j', dailyPlan);

    }catch(err) {
        return next(err);
    }
};
