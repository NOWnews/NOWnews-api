import cheerio from 'cheerio';
import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:changeInternalLink');

module.exports = async (htmlContent) => {
    try {
          let $ = cheerio.load( htmlContent , { decodeEntities: false });
          $('a[href^="/"]').attr('href','/');
          htmlContent = $.html()
          return htmlContent;
    } catch (err) {
        return console.err(err);
    }
};
