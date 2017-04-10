## INDEXPAGE API DOCUMENTS

- 首頁資料

### [GET] `/indexpage`

首頁的所有資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

## CATEGORY API DOCUMENTS

- 取得某分類的所有新聞
- 取得某分類的某種類的所有新聞

### [GET] `/cat/{:categoryName}`

取得某分類的所有新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| categoryName | 分類的名稱 | String | √ | `/category/life` |

### [GET] `/cat/{:categoryName}/{:type}`

取得某分類的某種類的所有新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| categoryName | 分類的名稱 | String | √ | `/category/life/NEWS` |
| type | 某個種類 | String | √ | `/category/life/VIDEOS` |

## MENU API DOCUMENTS

- 選單結構化資料

### [GET] `/menus`

menu 結構化資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

## NEWS API DOCUMENTS

- 新聞列表
- 單則新聞
- 單則新聞的相關新聞
- 某則新聞的上一則下一則新聞

### [GET] `/news`

取得新聞列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| mainMenus | MainMenu 的 sn | String | | `/news?mainMenus=1`, `/news?mainMenus=1,2,3` |
| menus | Menus 的 sn | String | | `/news?mainMenus=4,5,6` |

### [GET] `/news/{:sn}`

單一新聞資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| sn | 新聞的序號 | Number | √ | `/news/28` |

#### Body Parameters

None

#### Query Parameters

None

### [GET] `/news/{:sn}/relations`

單則新聞的相關新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| sn | 新聞的序號 | Number | √ | `/news/28` |

#### Body Parameters

None

#### Query Parameters

None

### [GET] `/news/{:sn}/nextandprev`

某則新聞的上一則下一則新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| sn | 新聞的序號 | Number | √ | `/news/28` |

#### Body Parameters

None

#### Query Parameters

None

## PREVIEW API DOCUMENTS

- 前台預覽資料

### [GET] `/previews/{:redisKey}`

前台預覽資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| redisKey | redis 的 key | String | √ | |

## PAGEVIEW API DOCUMENTS

- 紀錄 pageview 與使用者紀錄

### [PUT] `/pageviews`

紀錄 pageview 與使用者紀錄

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| url | 當前的 url(不包含 queryString) | String | √ | |
| newsId | 新聞的 ObjectId | String | | |
| menuId | 此新聞的 MainMenu ObjectId | String | | |
| queryString | url 後面的 query string | String | | |
| appPlatform | 如果是從 APP 來的話再帶入這個欄位 |  [`IOS`, `ANDROID`] | | |
| appView | 如果是從 APP 來的話再帶入這個欄位 | [`IN_APP`] | | |

#### Query Parameters

None

## TEMPERATURES API DOCUMENTS

- 喜歡某一篇新聞
- 取消喜歡某一篇新聞

### [PUT] `/temperatures`

喜歡某一篇新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| url | 當前的 url(不包含 queryString) | String | √ | |
| newsId | 新聞的 ObjectId | String | √ | |
| menuId | 此新聞的 MainMenu ObjectId | String | √ | |
| userId | 此新聞的 MainMenu ObjectId | String | √ | |

#### Query Parameters

None

### [DELETE] `/temperatures`

取消喜歡某一篇新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| url | 當前的 url(不包含 queryString) | String | √ | |
| newsId | 新聞的 ObjectId | String | √ | |
| menuId | 此新聞的 MainMenu ObjectId | String | √ | |
| userId | 此新聞的 MainMenu ObjectId | String | √ | |

#### Query Parameters

None

## HOT API DOCUMENTS

- 某一個選單的熱門新聞

### [GET] `/hot/{:categoryName}`

某一個選單的熱門新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| categoryName | 某一個選單的 categoryName | String | √ | |

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| startedAt | 開始時間 | String | | `2017-02-21` |
| endedAt | 結束時間 | String | | `2017-03-21` |

## SEARCH API DOCUMENTS

- 搜尋新聞 title， content 的 API

### [GET] `/search/{:keyword}`

搜尋新聞 title， content 的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| keyword | 關鍵字 | String | √ | |

#### Body Parameters

None

#### Query Parameters

None