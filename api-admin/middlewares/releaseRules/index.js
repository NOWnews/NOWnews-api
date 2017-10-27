import getData from './getData';
import sameCenter from './sameCenter';
import sameUser from './sameUser';
import superiorRoles from './superiorRoles';
import timeAndRole from './timeAndRole';
import excludeRoles from './excludeRoles'

// middlewares array 有順序
let middlewaresArray = [
    getData,
    excludeRoles,
    timeAndRole,
    sameUser,
    sameCenter,
    superiorRoles
];
module.exports = middlewaresArray;