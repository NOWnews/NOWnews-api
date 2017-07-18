# Change Log

NOWnews-api change logs
## 1.0.11 - 2017-07-18
### fixed
- hotnews 多拉圖片欄位 @wb

## 1.0.10 - 2017-07-18
### Added
- news 增加虛擬欄位 completeUrl @esbb48

## 1.0.9 - 2017-07-14
### Changed
- 增加熱門新聞數量 @esbb48

## 1.0.8 - 2017-07-11
### Added
-  加入 NOWlink 原生廣告 api 端點 `/app/nativead` @SimonSun
-  加入 NOWlink 原生廣告曝光率與點擊數端點 `/app/nativead/callback` @SimonSun

## 1.0.7 - 2017-07-11
### Changed
-  更新 staging 設定黨 @esbb48

## 1.0.6 - 2017-07-07
### Fixed
-  修正新聞沒快取時PV會出錯的問題 @jasonHsieh

### Changed
-  修改縮圖https to http @waynelin

## 1.0.5 - 2017-07-06
### Changed
-  重構 `libs/updateAllCategoryNews` @SimonSun
-  修改計算PV數的方式為aggregate @jasonHsieh
-  修正PV數 包括`/statistics`和`scores`下的端點 @jasonHsieh

## 1.0.4 - 2017-07-05
### Added
-  增加 `/policies/check` 端點 @esbb48
-  增加欄位給預覽端點 `freeContent`, `traceCode` @esbb48
-  增加 `/promote/common` 好康報報的廣告版位 @esbb48

## 1.0.3 - 2017-07-04
### Added
-  增加 `/news/newest` 端點 @SimonSun
-  增加 `/news/images` 端點 @SimonSun

### Changed
- Image model 的 virtual 欄位，加入判斷是否為 XXX.nownews.com 的圖片來源

## 1.0.2 - 2017-07-03
### Changed
-  更新get /news資料庫端點，為每筆news加上pageviews。(api-admin) @appleoxxo

## 1.0.1 - 2017-07-03
### Changed
- 更新 china 資料庫端點 @esbb48

### Fixed
- 搜尋端點不能拉到未來稿件 @esbb48
