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