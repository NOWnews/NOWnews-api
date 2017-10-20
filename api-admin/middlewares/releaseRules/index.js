import getData from './getData';
import sameCenter from './sameCenter';
import sameUser from './sameUser';
import superiorRoles from './superiorRoles';
import timeAndRole from './timeAndRole';

// middlewares array 有順序
let middlewaresArray = [
    getData,
    timeAndRole,
    sameCenter,
    sameUser,
    superiorRoles
];
module.exports = middlewaresArray;