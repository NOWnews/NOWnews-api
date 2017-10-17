import sameCenter from './sameCenter';
import sameUser from './sameUser';
import superiorRoles from './superiorRoles';
import timeAndRole from './timeAndRole';

// middlewares array 有順序
let middlewaresArray = [
    timeAndRole,
    sameCenter,
    sameUser,
    superiorRoles
];
module.exports = middlewaresArray;