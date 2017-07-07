# Change Log

NOWnews-api change logs

## 1.0.5 - 2017-07-07
### Changed
-  調整 `/search/:keyword`, `/news` 查詢順序 @esbb48

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
