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
None

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
| name | 姓名(模糊搜尋) | String |  | `name=wa` |
| status | 狀態(完全比對) | String |  | `status=NEWBIE` |
| Role | 角色(完全比對) | String |  | `Role=520000000000000000000001` |
| sort | 排序 | String |  | `sort=-createdAt`, `sort=name` |
| page | 第幾頁 | Number |  | `page=1` |
| limit | 一次幾筆資料 | Number |  | `limit=10` |
| skip | 跳過幾筆資料 | Number |  | `skip=10` |

### [POST] `/users/login`

登入端點

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters
None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.sun@nownews.com` |
| password | 密碼 | String | √  | `19880118` |

#### Query Parameters
None

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

### [GET] `/images`

圖片資訊列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 標題(模糊搜尋) | String |  | |
| desc | 描述(模糊搜尋) | String |  | |
| startedAt | 開始時間 | Date | | |
| endedAt | 結束時間 | Date | | |
| page | 第幾頁 | Number |  | `page=1` |
| limit | 一次幾筆資料 | Number |  | `limit=10` |
| skip | 跳過幾筆資料 | Number |  | `skip=10` |
| sort | 排序(預設為最新在最前面) | String | | `sort=createdAt`, `sort=-title` |

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

## NEWS API DOCUMENTS

### [POST] `/news`

新增一則新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 新聞的標題 | String | √ | `台北最 high 跨年夜` |
| shortTitle | 新聞的短標題 | String | | `跨年夜` |
| summary | 新聞的摘要 | String | | `台北跨年` |
| MainMenu | 主要分類 | ObjectId | | |
| Menus | 次分類 | ObjectIds | | |
| MainPhoto | 主圖 | ObjectId | | |
| MainVideo | 主影音 | ObjectId | | |
| content | 如果 type 為 NEWS，則此欄位為主要內容，由 ckeditor 提供 | String | | `<p>跨年夜天氣好</p>` |
| Photos | 如果 type 為 PHOTO，則會有圖片集合 | [ObjectId] | | |
| Videos | 如果 type 為 VIDEO，則會有影片集合 | [ObjectId] | | |
| freeContent | 自由欄位，由 ckeditor 提供 | String | | `<p>跨年夜天氣好</p>` |
| startedAt | 新聞開始時間，為預發稿使用 | Date | | |
| type | 新聞的類型 | `['NEWS', 'VIDEO', 'PHOTO']` | | |
| status | 新聞的狀態 | `['DRAFT', 'REVIEW', 'RELEASE', 'CLOSE']` | | |
| traceCode | 追蹤碼，由 ckeditor 提供 | String | | |
| isAdult | 成人新聞 | Boolean | | |
| isDeliver | 可否外送 | Boolean | | |
| location | 這則新聞的做標 | Object | | `[124, 12]` |
| Author | 作者，若沒傳入則帶入建立者 | ObjectId | | |
| Tags | 標籤(關鍵字) | [ObjectId] | | |
| CreatedBy | 建立者 | ObjectId | √ | |

#### Query Parameters
None

### [GET] `/news`

新聞列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters
None

#### Body Parameters
None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 標題(模糊搜尋) | String |  | `title=今天` |
| status | 狀態 | String |  | `status=DRAFT` |
| Author | 作者 | String |  | `Author=520000000000000000000001` |
| CreatedBy | 建立者 | String |  | `CreatedBy=520000000000000000000001` |
| UpdatedBy | 更新者 | String |  | `UpdatedBy=520000000000000000000001` |
| page | 第幾頁 | Number |  | `page=1` |
| limit | 一次幾筆資料 | Number |  | `limit=10` |
| skip | 跳過幾筆資料 | Number |  | `skip=10` |
| sort | 排序(預設為最新在最前面) | String | | `sort=createdAt`, `sort=-title` |

### [GET] `/news/{:id}`

單一新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 新聞 ObjectId | String | √ | |

#### Body Parameters
None

#### Query Parameters
None

### [PUT] `/news/{:id}/review`

送審一篇新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 新聞 ObjectId | String | √ | |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 新聞長標題 | String | √ | |
| shortTitle | 新聞短標題 | String | | |
| summary | 新聞摘要 | String | | |
| MainMenu | 主分類 | ObjectId | √ | |
| Menus | 次分類 | ObjectId | | |
| MainPhoto | 新聞首圖 | ObjectId | | |
| MainVideo | 新聞主影片 | ObjectId | | |
| content | 新聞內容 | String | √ | |
| Photos | 新聞圖片集合 | ObjectIds | | |
| Videos | 新聞影片集合 | ObjectIds | | |
| freeContent | 自由欄位 | String | | |
| startedAt | 新聞開始時間 | Date | | |
| type | 新聞的類別 | `['NEWS','VIDEO','PHOTO']` | | |
| traceCode | 新聞的追蹤碼 | String | | |
| isAdult | 是否為成人 | Boolean | | |
| isDeliver | 是否可外送 | Boolean | | |
| location | 這則新聞的做標 | Object | | `[124, 12]` |
| LastReviewer | 欲將新聞送審的人 | ObjectId | √ | |
| Author | 作者，若沒傳入則帶入建立者 | ObjectId | √ | |
| Tags | 標籤(關鍵字) | [ObjectId] | | |
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters
None

### [PUT] `/news/{:id}/release`

發布一篇新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 新聞 ObjectId | String | √ | |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 新聞長標題 | String | √ | |
| shortTitle | 新聞短標題 | String | | |
| summary | 新聞摘要 | String | | |
| MainMenus | 主分類 | ObjectId | √ | |
| Menus | 次分類 | ObjectId | | |
| MainPhoto | 新聞首圖 | ObjectId | | |
| MainVideo | 新聞主影片 | ObjectId | | |
| content | 新聞內容 | String | √ | |
| Photos | 新聞圖片集合 | ObjectIds | | |
| Videos | 新聞影片集合 | ObjectIds | | |
| freeContent | 自由欄位 | String | | |
| startedAt | 新聞開始時間 | Date | | |
| type | 新聞的類別 | `['NEWS','VIDEO','PHOTO']` | | |
| traceCode | 新聞的追蹤碼 | String | | |
| isAdult | 是否為成人 | Boolean | | |
| isDeliver | 是否可外送 | Boolean | | |
| location | 這則新聞的做標 | Object | | `[124, 12]` |
| Author | 作者，若沒傳入則帶入建立者 | ObjectId | √ | |
| Tags | 標籤(關鍵字) | [ObjectId] | | |
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters
None

### [PUT] `/news/{:id}/draft`

將一篇新聞存成草稿

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 新聞 ObjectId | String | √ | |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 新聞長標題 | String | √ | |
| shortTitle | 新聞短標題 | String | | |
| summary | 新聞摘要 | String | | |
| MainMenus | 主分類 | ObjectId | √ | |
| Menus | 次分類 | ObjectId | | |
| MainPhoto | 新聞首圖 | ObjectId | | |
| MainVideo | 新聞主影片 | ObjectId | | |
| content | 新聞內容 | String | √ | |
| Photos | 新聞圖片集合 | ObjectIds | | |
| Videos | 新聞影片集合 | ObjectIds | | |
| freeContent | 自由欄位 | String | | |
| startedAt | 新聞開始時間 | Date | | |
| type | 新聞的類別 | `['NEWS','VIDEO','PHOTO']` | | |
| traceCode | 新聞的追蹤碼 | String | | |
| isAdult | 是否為成人 | Boolean | | |
| isDeliver | 是否可外送 | Boolean | | |
| location | 這則新聞的做標 | Object | | `[124, 12]` |
| Author | 作者，若沒傳入則帶入建立者 | ObjectId | √ | |
| Tags | 標籤(關鍵字) | [ObjectId] | | |
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters
None

### [PUT] `/news/{:id}/close`

將一篇新聞關閉

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 新聞 ObjectId | String | √ | |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters
None

### [DELETE] `/news/{:id}`

刪除新聞

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 新聞 ObjectId | String | √ | |

#### Body Parameters
None

#### Query Parameters
None

## MAP API DOCUMENTS

### [GET] `/map/location`

利用地址查詢座標，或利用座標查詢地址

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters
None

#### Body Parameters
None

#### Query Parameters
| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| address | 地址 | String |  | `台北市內湖區` |
| latlng | 座標 | String | | `25.0261583,121.5427093` |

## NEWS MEMO API DOCUMENTS

### [POST] `/newsmemo`

為一則新聞加入一筆備忘錄

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| News | 新聞的ObjectId | ObjectId  | √ | |
| content | memo 的內容 | String | √ | `這篇新聞送審中` |
| CreatedBy | 建立者 | ObjectId | √ | |

#### Query Parameters
None

### [GET] `/newsmemo`

找尋某則新聞的所有備忘錄

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters
None

#### Body Parameters
None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| news | 新聞的 ObjectId | ObjectId | | |
| sort | 排序的方式 | String | | `createdAt`, `-updatedAt` |

## NEWS LOG API DOCUMENTS

### [GET] `/newslog`

找尋新聞編輯紀錄列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters
None

#### Body Parameters
None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| newsId | 新聞的 ObjectId | ObjectId | | |
| sort | 排序的方式 | String | | `createdAt`, `-updatedAt` |

### [GET] `/newslog/compare`

抓兩筆 log 出來做比較

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters
None

#### Body Parameters
None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| beforeLogId | log ObjectId | ObjectId | | |
| afterLogId | log ObjectId | ObjectId | | |

## TAG API DOCUMENT

### [GET] `/tags`

取得 tag 列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| name | 姓名(模糊搜尋) | String |  | `name=wa` |
| page | 第幾頁 | Number |  | `page=1` |
| limit | 一次幾筆資料 | Number |  | `limit=10` |
| skip | 跳過幾筆資料 | Number |  | `skip=10` |

### [POST] `/tags`

創建一個 tag

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| name | 名稱 | String | √ | `分析師` |
| type | 類別 | String | | `分析後台資料` |
| CreatedBy | 建立者 | String | √ | `530000000000000000000001` |

#### Query Parameters

None

### [GET] `/tags/{:id}`

取得單一 tag 資訊

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | tag 的 ObjectId | ObjectId |  | |

#### Body Parameters

None

#### Query Parameters

None

### [DELETE] `/tags/{:id}`

刪除單一 tag

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | tag 的 ObjectId | ObjectId |  |  |

#### Body Parameters

None

#### Query Parameters

None

## MENU API DOCUMENT

### [GET] `/menus`

取得 menu 列表

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

### [POST] `/menus`

創建一個 menu 項目

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| name | 名稱 | String | √ | `分析師` |
| url | 網址 | String | | `分析後台資料` |
| isExternal | 是否為外部連結 | Boolean | | |
| status | 類別 | String | | `分析後台資料` |
| CreatedBy | 建立者 | String | √ | `530000000000000000000001` |

#### Query Parameters

None

### [GET] `/menus/struction`

取得 menu 階層結構化資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None

### [PUT] `/menus/sort`

排序 menu 的端點

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| menus | 要更新的 menu 物件 | Object | √ | |

#### Query Parameters

None

### [PUT] `/menus/{:id}`

更新一個 menu 項目

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| name | 名稱 | String | √ | `分析師` |
| url | 網址 | String | | `分析後台資料` |
| isExternal | 是否為外部連結 | Boolean | | |
| status | 類別 | String | | `分析後台資料` |
| UpdatedBy | 更新者 | String | √ | `530000000000000000000001` |

#### Query Parameters

None

### [DELETE] `/menus/{:id}`

刪除一個 menu 項目

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

None

#### Query Parameters

None