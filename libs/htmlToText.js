/*
# 用來過濾 HTML 的 Tag
input - 輸入的 HTML
allowed - 永許留下的 HTML Tag
**/
module.exports = (input, allowed) =>{
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    return input
        .replace(/[\n,\r,\s]/g,'')
        .replace(/&nbsp;/ig, '')
        .replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
};