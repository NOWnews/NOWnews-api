import cleanInvalidToken from './cleanInvalidToken';
import updateAllHotNews from './updateAllHotNews';
import updatePersonalize from './updatePersonalize';
import updateHotKeywords from './updateHotKeywords';
import updateInstantNews from './updateInstantNews';
import updateFirstPageForMobile from './updateFirstPageForMobile';
import updateFirstPageForDesktop from './updateFirstPageForDesktop';
import updateNewestNews from './updateNewestNews';
import updateNewestImages from './updateNewestImages';
import updateBig5Small5 from './updateBig5Small5';

const env = process.env.NODE_ENV || 'dev'; //若環境為 china 時 不執行匯入新聞 防止重複 https://github.com/NOWnews/NOWnews-api/issues/867

if (env === 'china') {

} else {
  import importMNA from './importMNA';
  import importCnaImages from './importCnaImages';
  import importCnaNews from './importCnaNews';
  import importCNYES from './importCNYES';
}


module.exports = async() => {
  if (env === 'china') {
    await Promise.all([
      cleanInvalidToken.start(),
      updateAllHotNews.start(),
      updatePersonalize.start(),
      updateHotKeywords.start(),
      updateInstantNews.start(),
      updateFirstPageForMobile.start(),
      updateFirstPageForDesktop.start(),
      updateNewestNews.start(),
      updateNewestImages.start(),
      updateBig5Small5.start()
    ]);
  } else {
    await Promise.all([
      cleanInvalidToken.start(),
      updateAllHotNews.start(),
      updatePersonalize.start(),
      updateHotKeywords.start(),
      updateInstantNews.start(),
      updateFirstPageForMobile.start(),
      updateFirstPageForDesktop.start(),
      updateNewestNews.start(),
      updateNewestImages.start(),
      updateBig5Small5.start(),
      importMNA.start(),
      importCnaImages.start(),
      importCnaNews.start(),
      importCNYES.start()
    ]);
  }

};
