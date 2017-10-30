import Debug from 'debug';
const debug = Debug('NOWnews-api:api-admin:controllers:user:reviewrs');
import { Role, User, ReleaseRule } from '../../../models';
import _ from 'lodash';

module.exports = async(req, res, next) => {

    let { id } = req.params;

    try {
        const user = await User.findOne()
            .where('_id').equals(id)
            .where('isTrashed').equals(false)
            .select('id Role Center')
            .populate('Role');

        if (!user) {
            throw new Error('11011');
        }

        let cursor = User.find();
        let releaseRules = await ReleaseRule
            .findOne({})
            .sort({
                createdAt: -1
            });
        if (releaseRules) {
            let rules = releaseRules.rules;
            if (rules.excludeRoles.isOn) {
                cursor.where('Role').nin(rules.excludeRoles.setting.roleIds);
            }
            if (rules.canSameCenterReview.isOn) {
                cursor.or({
                    'Center': user.Center.toString()
                });
            }
            rules.canSameCenterReview.isOn ?
                cursor.or({ '_id': user.id }) : cursor.where('_id').ne(user.id);

            if (rules.timeAndRole.isOn) {
                let setting = rules.timeAndRole.setting;
                _.forEach(setting, (s) => {
                    cursor.or([{
                        $and: [{
                                'Role': {
                                    $in: s.roleIds
                                }
                            },
                            {
                                'Center': s.centerId
                            }
                        ]
                    }]);
                });
            }
        }

        const users = await cursor.find()
            .where('isTrashed').equals(false)
            .where('status').equals('REGULAR')
            .select('_id name')
            .or({
                'Role': {
                    $in: user.Role.SuperiorRoles
                }
            })
            .execAsync();

        return res.json(users);

    } catch (err) {
        return next(err);
    };
};