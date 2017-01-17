# NOWnews api

NOWnews 新版前後台專用 api

## 啟動

- develop 模式: `npm run api`
- staging 模式: `NODE_ENV=staging pm2 start ./bin/api --name 'NOWnews-api-staging'`
- production 模式: `NODE_ENV=production pm2 start ./bin/api --name 'NOWnews-api-production'`

## USER API DOCUMENTS

### [POST] `/users`

建立一個新的後台使用者

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| name | 真實姓名 | String | √ | `Simon Sun` |
| nickname | 暱稱 | String |  | `John Cena` |
| staffId | 員工編號 | String |  | `NN00123` |
| status | 此帳號狀態 | String |  | `['NEWBIE', 'REGULAR', 'SUSPENDED', 'LEAVING']` |
| Role | 角色的 ObjectId | ObjectId |  | `520000000000000000000001` |
| email | email | String | √ | `simon.sun@nownews.com` |
| password | 密碼 | String |√  | `abc123` |
| phone | 電話 | String  |  | `(02)2222-1111` |
| Center | 中心的 ObjectId | ObjectId  |  | `550000000000000000000001` |
| Department | 部門的 ObjectId | ObjectId  |  | `540000000000000000000001` |
| jobTitle | 職稱 | String  |  | `工程師` |
| profileLink | 個人資料連結 | String  |  | |
| Avatar | 大頭照 | String  |  | |
| CreatedBy | 建立者 ObjectId | ObjectId  | √ | `530000000000000000000001` |

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| page | 第幾頁 | Number |  | `page=1` |
| limit | 一次幾筆資料 | Number |  | `limit=10` |
| skip | 跳過幾筆資料 | Number |  | `skip=10` |

### [GET] `/users`

取得 User 列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| page | 第幾頁 | Number |  | `page=1` |
| limit | 一次幾筆資料 | Number |  | `limit=10` |
| skip | 跳過幾筆資料 | Number |  | `skip=10` |

### [GET] `/users/{:id}`

取得單一 User 資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | User 的 ObjectId | String |  | `/users/530000000000000000000001` |

None

#### Body Parameters

#### Query Parameters

### [PUT] `/users/{:id}`

更新單一 User 資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | User 的 ObjectId | String |  | `/users/530000000000000000000001` |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| name | 真實姓名 | String | | `Foo` |
| nickname | 暱稱 | String |  | `Bar` |
| staffId | 員工編號 | String |  | `NN00456` |
| status | 此帳號狀態 | String |  | `['NEWBIE', 'REGULAR', 'SUSPENDED', 'LEAVING']` |
| Role | 角色的 ObjectId | ObjectId |  | `520000000000000000000001` |
| phone | 電話 | String  |  | `(02)2222-1111` |
| Center | 中心的 ObjectId | ObjectId  |  | `550000000000000000000001` |
| Department | 部門的 ObjectId | ObjectId  |  | `540000000000000000000001` |
| jobTitle | 職稱 | String  |  | `工程師` |
| profileLink | 個人資料連結 | String  |  | |
| Avatar | 大頭照 | String  |  | |
| UpdatedBy | 建立者 ObjectId | ObjectId  | √ | `530000000000000000000001` |

None

### [DELETE] `/users/{:id}`

刪除單一 User 資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | User 的 ObjectId | String |  | `/users/530000000000000000000001` |

None

#### Body Parameters

#### Query Parameters

## ROLE API DOCUMENTS

### [GET] `/roles`

回傳角色列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |


### [POST] `/roles`

建立一個新的使用者角色

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| name | 角色名稱 | String | √ | `分析師` |
| desc | 角色描述 | String | √ | `分析後台資料` |
| Policies |  | 驗證的端點權限 | √ | `["510000000000000000000001","510000000000000000000002"]` |
| CreatedBy | 建立者 | String | √ | `530000000000000000000001` |
| UpdatedBy | 最後更新者 | String | √ | `530000000000000000000001` |

#### Query Parameters


### [GET] `/roles/:id`

取得單筆角色資訊並關聯其權限

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 角色 ObjectId | String | √ | `520000000000000000000001` |


#### Body Parameters
None

#### Query Parameters
None

### [DELETE] `/roles/:id`

刪除單筆角色

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 角色 ObjectId | String | √ | `520000000000000000000001` |


#### Body Parameters
None

#### Query Parameters
None

### [PUT] `/roles/:id`

修改單筆角色

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 角色 ObjectId | String | √ | `520000000000000000000001` |


#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| name | 角色名稱 | String | √ | `分析師` |
| desc | 角色描述 | String | √ | `分析後台資料` |
| Policies |  | 驗證的端點權限 | √ | `["510000000000000000000001","510000000000000000000002"]` |
| UpdatedBy | 最後更新者 | String | √ | `530000000000000000000001` |

#### Query Parameters
None

## IMAGE API DOCUMENTS

### [POST] `/images/upload`

上傳一張圖片

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| image | 要上傳的圖片 | File | √ | |
| keyword | 這張圖片的關鍵字 | String |  | `測試` |
| title | 這張圖片的標題 | String |  | `測試圖片` |
| desc | 這張圖片的圖說 | String |  | `這是測試圖片` |
| type | 圖片的分類 | `['NEWS','AVATAR']` |  | `NEWS` |
| CreatedBy | 最後更新者 | String | √ | `530000000000000000000001` |

#### Query Parameters
None

### [GET] `/images/{:id}`

讀取一張圖片

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 圖片 ObjectId | String | √ | `560000000000000000000001` |

#### Body Parameters

None

#### Query Parameters
None

### [DELETE] `/images/{:id}`

刪除一張圖片

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 圖片 ObjectId | String | √ | `560000000000000000000001` |

#### Body Parameters
None

#### Query Parameters
None

### [DELETE] `/images/{:id}/realRemove`

刪除一張圖片(真實)

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 圖片 ObjectId | String | √ | `560000000000000000000001` |

#### Body Parameters
None

#### Query Parameters
None