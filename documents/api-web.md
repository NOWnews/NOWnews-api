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

- 單則新聞
- 單則新聞的相關新聞

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