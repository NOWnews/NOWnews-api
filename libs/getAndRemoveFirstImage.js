import cheerio from 'cheerio';
import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:getFirstImageFromDOM');

module.exports = (htmlContent) => {
    try {
          let $ = cheerio.load( htmlContent , { decodeEntities: false });
          let firstImage = null;
          let parsedFirstImage = $('img').first();

          if( parsedFirstImage.attr('src') !== undefined ) {
            firstImage = {
              src : parsedFirstImage.attr('src'),
              alt : parsedFirstImage.attr('alt'),
              width : parsedFirstImage.attr('width')
            };
            parsedFirstImage.remove();
            htmlContent = $.html();
          }
          return { firstImage, htmlContent };
    } catch (err) {
        return console.error(err);
    }
};
