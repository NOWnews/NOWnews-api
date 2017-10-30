import getData from './getData';
import canSameCenterReview from './canSameCenterReview';
import canSameUserReview from './canSameUserReview';
import superiorRoles from './superiorRoles';
import timeAndRole from './timeAndRole';
import excludeRoles from './excludeRoles'

// middlewares array 有順序
let middlewaresArray = [
    getData,
    excludeRoles,
    timeAndRole,
    canSameUserReview,
    canSameCenterReview,
    superiorRoles
];
module.exports = middlewaresArray;