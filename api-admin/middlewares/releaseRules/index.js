import getData from './getData';
import canSameCenterReview from './canSameCenterReview';
import canSameUserReview from './canSameUserReview';
import superiorRoles from './superiorRoles';
import timeAndRole from './timeAndRole';
import excludeRoles from './excludeRoles'

/** middlewaresArray 有順序
 * 順序的依據是 當規則發生衝突時，愈前面的規則優先序最高
 * getData 是先取得需要的資料
 * 規則目前的順序 excludeRoles 最高
 * 也就是說：當 excludeRoles 和 timeAndRole 的設定發生衝突時 會以 excludeRoles 的設定為準 以此類推
 */

let middlewaresArray = [
    getData,
    excludeRoles,
    timeAndRole,
    canSameUserReview,
    canSameCenterReview,
    superiorRoles
];
module.exports = middlewaresArray;