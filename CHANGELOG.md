# Change Log

NOWnews-api change logs

## [Unreleased]

## 1.0.27 - 2017-08-24
###Fixed
- 修正首頁控版的時間格式 @wb
- 加上 Android token @wb

## 1.0.27 - 2017-08-24
### Added
- 加入 GCP Trace 機制 (加入 `@google-cloud/trace-agent` 套件) @SimonSun
- 加入 `tools/cleanUselessDevices.js` 清除沒效用的 device 小工具  @SimonSun

### Changed
- 修復admin上傳過大mp4檔案會失敗的問題 @appleoxxo
- Fixed 當頻道列表為空的時候會產生的錯誤 @SimonSun
- 取得首頁控版的資料，用 select 取得需要的欄位 @wb
- 首頁控版加上後台所需要的後台網址 @wb
- 各新聞加上 pv( 首頁控版 api, 特輯列表 api, 專題列表 api) @wb
- 增開使用者的地區虛擬欄位 ( defaultLocation ) @wb
- 新聞內頁，個人化新聞，相關新聞 API 瘦身 @SimonSun
- menu，即時新聞 API 瘦身 @SimonSun
- 調整 `tools/cleanRepeatDevices.js` 清除重複 device 小工具  @SimonSun
- 暫時將千尋測試端點導到 403 @SimonSun

## 1.0.26 - 2017-08-17
### Added
- 加入 GCP Error Report 機制 (加入 `@google-cloud/error-reporting` 套件) @SimonSun

### Changed
- 調整千尋 API 內容，加入 `MainPhoto` 欄位 @SimonSun

## 1.0.25 - 2017-08-16
### Changed
- 調整推播搜尋條件，把空的或是 `null` 的資料濾除 @SimonSun

## 1.0.24 - 2017-08-15
### Added
- 加入千尋娛樂用 api 端點 @SimonSun

## 1.0.23 - 2017-08-14
### Changed
- 暫停世大運活動 @esbb48

### Added
- 加入與調整 OTT 後台功能 @SimonSun
- 後台每篇貼文加上 facebook 資訊(表情數，分享數，留言數) @SimonSun

## 1.0.22 - 2017-08-12
### Changed
- 調整直撥 api 內容 @SimonSun
- 先把 user 預設 location 欄位先註解起來 @SimonSun

## 1.0.21 - 2017-08-11
### Added
- 增加 user 預設欄位 @wb

## 1.0.20 - 2017-08-09
### Changed
- 調整世大運機率前幾天 80% 變 60% @esbb48

## 1.0.19 - 2017-08-07
### Changed
- 修改鉅亨網匯入新聞的文末連結 @appleoxxo
- 新聞內容全文檢索功能暫時拿掉，目前只搜尋標題 @SimonSun
- 上傳圖片長度大於 1600px 則將圖片 resize 到 1600px 的長度 @SimonSun
- 圖片如果要壓上浮水印，則把圖片長度拉到 1080px 的長度 @SimonSun

## 1.0.18 - 2017-08-03
### Added

- 加入計算 pageview 的平均數與總量 @SimonSun
- 加入新聞列表端點給 search engine 用 @SimonSun
- 更改 NOWnews APP 頻道列表 @SimonSun
- 加入 APP 版本確認 @SimonSun
- 加入世大運活動 @wb

### Changed
- 調整鉅亨網新聞內連 @appleoxxo

## 1.0.17 - 2017-08-02
- 匯入鉅亨網新聞調整 @SimonSun
- 改成使用 Firebase Cloud Message 做 APP 推播 @SimonSun
- 加入 Web 推播功能 @SimonSun

## 1.0.16 - 2017-07-30
- 修正Rss API的時間條件 @appleoxxo

## 1.0.15 - 2017-07-30
- 修正鉅亨網匯入新聞有重複的問題 @appleoxxo

## 1.0.14 - 2017-07-27
- Rss 加上影片新聞的影片 populate @wb

## 1.0.13 - 2017-07-24
- Rss 加上圖片新聞的圖片 populate @wb

## 1.0.12 - 2017-07-20
- 直播上了2個類別, 5個頻道 @wb

## 1.0.11 - 2017-07-19
- 調整 `2582589` 這篇廣告對應的og:url @esbb48

## 1.0.10 - 2017-07-18
### Added
- news 增加虛擬欄位 completeUrl @esbb48
### Fixed
- hotnews 多拉圖片欄位 @wb

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
