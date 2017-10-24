# Change Log

NOWnews-api change logs

## [Unreleased]

### Added
- 新增兩個 tool 整理舊 Web AppInfo token 資料，請依序執行 @esbb48
  - tools/cleanRepeatTokenForWeb.js
  - tools/cleanInvalidToken.js
- 新增 cronjob cleanInvalidToken @esbb48

- 新增 審核權限設定 可設定以下審核權限 @appleoxxo
  - 1. 特定中心、時段、角色 可以發佈任何新聞 （此次新增）
  - 2. 特定角色不能發佈文章（此次新增）
  - 3. 新聞建立者同中心的同仁擁有發佈權 (此次新增)
  - 4. 新聞審核者和建立者不能為同一位使用者（已有功能新增開關）

### Changed
- 增加廣告版位在 `/promote/home` 端點 @esbb48
- 軍聞社匯入新聞改分類 @appleoxxo
- 區分 firebase prod 和 dev 的環境 @esbb48
- 調整更新 POST `/app/info` 端點判斷重複的邏輯 @esbb48
- 重構現有的 notification @esbb48
- 避免重複的 token 被撈出 @esbb48
- 現在圖片的 sizeFormat 改使用 `rssimg.nownews.com` 這個來源 @SimonSun
- 將 staging 環境加入 CDN 並把 config 拆開 @SimonSun

## 1.0.39 - 2017-10-17
### Changed
- 後台上傳圖片先去打一次imagelab協助併版 @wayne

## 1.0.38 - 2017-10-16
### Added
- 後台上傳圖片改為漸進式JPEG @appleoxxo

## 1.0.37 - 2017-10-12
### Added
- [新隱藏Cron匯入點] cronjob恢復軍聞社匯入 加上圖片錯誤時存墊檔圖的機制 @appleoxxo

### Changed
- 產生批次匯入新聞專用的使用者，不然現在是系統管理者，新聞部同仁無法編輯再發布 @esbb48

### Fixed
- 軍聞社的新聞主圖改存到自家圖庫並恢復匯入 @appleoxxo

## 1.0.36 - 2017-10-05
### Changed
- 為 `refreshFbDebugger` 增加 `access_token` @esbb48
- 調整浮水印 @esbb48

### Fixed
- 預發稿不更新 fb 暫存 @esbb48

## 1.0.35 - 2017-10-02
### Added
- `/menus` 增加 `sort` 的搜尋條件 @esbb48
- 新增 google 自然語言關鍵字推薦 api @SimonSun

### Changed
- 新聞發布時會去更新 fb 暫存 @esbb48
- 調整浮水印與預設圖 @esbb48


## 1.0.34 - 2017-09-28
### Fixed
- 修正所有匯入新聞的時間（時區問題）@appleoxxo

### Changed
- 修改上下篇新聞的規則為依照發佈時間抓上下篇（只取同主分類的新聞）
- 相關新聞條件變更為：同主分類+同關鍵字 優先 若沒有則同主分類最新 補滿3筆 @appleoxxo

## 1.0.33 - 2017-09-21
### Added
- 加入 `/news/{:id}/wasreleased` 此篇新聞是否發佈過的 api 端點 ＠SimonSun
- 增加三個內頁推薦廣告：3032, 3038, 3039 @esbb48
- 熱門新聞改成一定要滿6筆（專欄版型11筆) @appleoxxo
- 加入 `/news/{:id}/wasreleased` 此篇新聞是否發佈過的 api 端點 ＠SimonSun

### Changed
- 即時新聞 `/instant` 過濾掉業配文 ＠SimonSun
- 依據不同環境產生對應合適的 `completeUrl`(og:url用) @esbb48
- 使用 `imageLab` @esbb48
- 統一使用同一個 config 移除不需要的 `general.thumbnail` @esbb48

### Fixed
- 修復不相關角色也能修改文章的問題 @appleoxxo

## 1.0.32 - 2017-09-14
### Changed
- 因軍聞社圖片有的出不來 先停止匯入軍聞社新聞 ＠appleoxxo

## 1.0.31 - 2017-09-13
### Fixed
- api-web 的 /instant 移除匯入新聞（即時跑馬燈）
- 修正 google trace engine 造成 CPU 與 Memory 消耗過大問題 @SimonSun

### Changed
- 任何狀態的新聞都可以改成審稿狀態 @wb
- pro imgapi 端點設為 imgapiv2 @wb
- 移除api-web端點 /news中的敏感資訊 @appleoxxo
- 修改admin端點 /indexpage 內carousel 新增feedFrom欄位資料 @appleoxxo
- 所有 .delete 端點，都加上 `UpdatedBy` @SimonSun
- 調整 Role 新增修改時可帶 `level`, `SuperiorRoles` 欄位 @esbb48
- 在發布與送審時，確認更新者的身份 @esbb48
- 更改 china config 中 imagelab 的 url @SimonSun

### Added
- 新增軍聞社新聞匯入 @appleoxxo
- 新增中央社新聞匯入 @appleoxxo
- 加入 imagelab 縮圖網址與在 Image mode 加入 sizeFormat 虛擬欄位 @SimonSun
- 增加廠商專屬的列表「我的新聞(廠商)」權限@esbb48
- 加入特輯版型業配專欄 API， initData policy.js 加入 `專欄管理(專欄列表 - 特輯版型)` 與 `專欄管理(新增專欄 - 特輯版型)` @SimonSun
- 加入從 excel 匯入新聞關鍵字工具，加入 `convert-excel-to-json` node module @SimonSun
- 增加欄位 `level`, `SuperiorRoles` 至 Role 表 @esbb48
- 增加端點 `/roles/:id/reviewers` @esbb48

## 1.0.30 - 2017-09-04
### Fixed
- 修正 中央社匯入圖片有IP限制 外網看不到的問題 @appleoxxo

## 1.0.29 - 2017-09-01
### Fixed
- 修正 ios 內文圖出不來的問題 @webber

## 1.0.28 - 2017-08-31
### Changed
- Admin的api端點 /users 加上 isInitUser 判斷 ＠appleoxxo
- Adminapi端點 /news 加上 isFeed 判斷 ＠appleoxxo
- 鉅亨網匯入新聞加入關鍵字和修正短標題規則 @appleoxxo
- 修正匯入新聞若編輯無法選擇匯入作者 @appleoxxo
- 中央社匯入圖片圖說加上▲ @appleoxxo
- 暫時把鉅亨網新聞匯入註解掉 @appleoxxo
- 優化圖片搜尋增加 index @esbb48

### Added
- 刪除新聞的時候，也要有 log (因應這個功能，所以在 `newLog` 這個 schema 加入新的欄位 `newsTrashed`) @SimonSun
- cronjob加上中央社圖片匯入 @appleoxxo

###Fixed
- instant 補傳 MainVideo 的欄位 @esbb48

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
