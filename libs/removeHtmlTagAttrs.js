/* 底下的 regex 是將 html 中 所有 tag 的 style, width, height, srcset 這幾個 attribute 移除
* https://regex101.com/r/UTVJx5/1
*/
import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:removeHtmlTagAttrs');

module.exports = (htmlContent) => {
    try {
        const regex = /(style|width|height|srcset)=["']([^"']*)["']/gi;
        return htmlContent.replace(regex,'');
    } catch (err) {
        return console.error(err);
    }
};
