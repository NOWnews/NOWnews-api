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
| defaultAuthor | 使用者建立新聞時的預設作者 | ObjectId  |  | `520000000000000000000001` |
| defaultMenu | 使用者建立新聞時的預設主選單 | ObjectId  |  | `520000000000000000000001` |
| defaultNewsBy | 使用者建立新聞時的預設訊頭 | Stringg  |  | |
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
| Department | 部門(完全比對) | String |  | `Department=520000000000000000000001` |
| Center | 中心(完全比對) | String |  | `Center=520000000000000000000001` |
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

### [POST] `/users/logout`

登出端點(目前只有留下登出紀錄，沒有任何實質登出功能)

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters
| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| userId | User 的 ObjectId | ObjectId | √ | `530000000000000000000001` |

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
| defaultAuthor | 使用者建立新聞時的預設作者 | ObjectId  |  | `520000000000000000000001` |
| defaultMenu | 使用者建立新聞時的預設主選單 | ObjectId  |  | `520000000000000000000001` |
| defaultNewsBy | 使用者建立新聞時的預設訊頭 | Stringg  |  | |
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
| keywords | 會針對 title, desc, keyword 欄位做模糊搜尋 | String |  | `張學友,演唱會` |
| imageFrom | 圖片的來源 | String |  | |
| startedAt | 開始時間 | Date | | |
| endedAt | 結束時間 | Date | | |
| page | 第幾頁 | Number |  | `page=1` |
| limit | 一次幾筆資料 | Number |  | `limit=10` |
| skip | 跳過幾筆資料 | Number |  | `skip=10` |
| sort | 排序(預設為最新在最前面) | String | | `sort=createdAt`, `sort=-title` |

### [POST] `/images/`

上傳一張圖片(外部連結)

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| url | 要上傳的圖片 | String | √ | |
| title | 這張圖片的標題 | String |  | `測試圖片` |
| desc | 這張圖片的圖說 | String |  | `這是測試圖片` |
| keyword | 圖片的關鍵字(攝影大哥自己內部控管) | String |  | `這是測試圖片` |
| type | 圖片的分類 | `['NEWS','AVATAR']` |  | `NEWS` |
| isDeliver | 是否可以上傳 | String |  | `true` |
| Tag | 圖片的標籤(關鍵字) | ObjectId |  | |
| CreatedBy | 最後更新者 | String | √ | `530000000000000000000001` |

#### Query Parameters
None

### [POST] `/images/upload`

上傳一張圖片(圖片上傳)

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
| title | 這張圖片的標題 | String |  | `測試圖片` |
| desc | 這張圖片的圖說 | String |  | `這是測試圖片` |
| keyword | 圖片的關鍵字(攝影大哥自己內部控管) | String |  | `這是測試圖片` |
| type | 圖片的分類 | `['NEWS','AVATAR']` |  | `NEWS` |
| isDeliver | 是否可以上傳 | String |  | `true` |
| Tag | 圖片的標籤(關鍵字) | ObjectId |  | |
| CreatedBy | 最後更新者 | String | √ | `530000000000000000000001` |
| isWatermark | 是否壓上浮水印 | String |  | |

#### Query Parameters
None

### [POST] `/images/clone`

複製一份 Image 物件(更新圖說時)

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 圖片的 ObjectId | String | √ | `530000000000000000000001` |
| desc | 這張圖片的圖說 | String | √ | `更新圖說` |
| CreatedBy | 建立者 | String | √ | `530000000000000000000001` |

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

### [PUT] `/images/{:id}`

更新圖片(目前只能更新圖說，而且圖片必須是由外站傳進來的圖片)

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 圖片 ObjectId | String | √ | `560000000000000000000001` |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| desc | 這張圖片的圖說 | String | √ | `更新圖說` |
| UpdatedBy | 更新者 | String | √ | `530000000000000000000001` |

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

## VIDEO API DOCUMENTS

### [POST] `/videos`

上傳一則影片(外部連結)

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| url | 影片的連結 | String | √ | |
| title | 影片的標題 | String |  | `測試影片` |
| desc | 影片的說明 | String |  | `這是測試影片` |
| type | 影片的分類 | `['NEWS']` |  | `NEWS` |
| Tags | 標籤(關鍵字) | [ObjectId] |  | |
| CreatedBy | 最後更新者 | String | √ | `530000000000000000000001` |

### [GET] `/videos`

影片列表

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
| title | 用標題做模糊搜尋 | String | | |
| page | 第幾頁 | Number |  | `page=1` |
| limit | 一次幾筆資料 | Number |  | `limit=10` |
| skip | 跳過幾筆資料 | Number |  | `skip=10` |
| sort | 排序(預設為最新在最前面) | String | | `sort=createdAt`, `sort=-title` |

### [POST] `/videos/upload`

上傳一則影片(由本機上傳)

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| video | 要上傳的圖片 | File | √ | |
| title | 影片的標題 | String |  | `測試影片` |
| desc | 影片的說明 | String |  | `這是測試影片` |
| type | 影片的分類 | `['NEWS']` |  | `NEWS` |
| Tags | 標籤(關鍵字) | [ObjectId] |  | |
| CreatedBy | 最後更新者 | String | √ | `530000000000000000000001` |

#### Query Parameters

None

### [GET] `/videos/{:id}`

影片單一資訊

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

### [PUT] `/videos/{:id}`

更新影片資訊

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 影片的標題 | String |  | `測試影片` |
| desc | 影片的說明 | String |  | `這是測試影片` |
| UpdatedBy | 最後更新者 | Object | √ | `530000000000000000000001` |

#### Query Parameters

None

### [DELETE] `/videos/{:id}`

刪除影片

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| UpdatedBy | 最後更新者 | Object | √ | `530000000000000000000001` |

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
| isSponsored | 可否為業配文 | Boolean | | |
| location | 這則新聞的做標 | Object | | `[124, 12]` |
| newsBy | 訊頭 | String | | |
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
| type | 新聞的分類 | String |  | `type=NEWS` |
| status | 狀態 | String |  | `status=DRAFT` |
| Author | 作者 | String |  | `Author=520000000000000000000001` |
| startedAt | 開始時間 | String |  | `startedAt=2017-06-07` |
| endedAt | 結束時間 | String |  | `endedAt=2017-06-07` |
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
| Menus | 次分類 | ObjectIds | | |
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
| isSponsored | 可否為業配文 | Boolean | | |
| location | 這則新聞的做標 | Object | | `[124, 12]` |
| newsBy | 訊頭 | String | √ | |
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
| Menus | 次分類 | ObjectIds | | |
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
| isSponsored | 可否為業配文 | Boolean | | |
| location | 這則新聞的做標 | Object | | `[124, 12]` |
| newsBy | 訊頭 | String | √ | |
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
| Menus | 次分類 | ObjectIds | | |
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
| isSponsored | 可否為業配文 | Boolean | | |
| location | 這則新聞的做標 | Object | | `[124, 12]` |
| newsBy | 訊頭 | String | | |
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
| tags | 名稱 | Array | √ | `["政治", "金正恩"]` 不能大於 7 個 item |
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

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| level | 選單的層級 | Number |  |  |

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
| categoryName | 分類名稱 | String | | `policy` |
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
| categoryName | 名稱 | String | √ | `policy` |
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

## TRENDING API DOCUMENTS

### [GET] `/trend/googleKeywords`

取得當前的 google 熱搜關鍵字

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


## SPECIALTOPIC API DOCUMENT

### [POST] `/specialtopics`

創建一個專題

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 專題的標題 | String | √ | |
| MainPhoto | 專題的主圖(Image) | ObjectId | √ | |
| url | 專題的連結 | String | √ | |
| CreatedBy | 建立者 | ObjectId | √ | |

#### Query Parameters

None

### [GET] `/specialtopics`

專題列表

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
| title | 用標題做模糊搜尋 | String | | |

### [GET] `/specialtopics/{:id}`

單一專題資訊

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

### [PUT] `/specialtopics/{:id}`

更新單一專題

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 專題的標題 | String | | |
| MainPhoto | 專題的主圖(Image) | ObjectId | | |
| url | 專題的連結 | String | | |
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters

None

### [DELETE] `/specialtopics/{:id}`

刪除單一專題

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters

None

## SPECIALCHANNEL API DOCUMENT

### [POST] `/specialchannels`

創建一個特輯

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 特輯的標題 | String | √ | |
| MainPhoto | 特輯的主圖(Image) | ObjectId | √ | |
| newsList | 新聞 ObjectId 陣列 | [ObjectId]  | √ | |
| CreatedBy | 建立者 | ObjectId | √ | |

#### Query Parameters

None

### [GET] `/specialchannels`

特輯列表

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
| title | 用標題做模糊搜尋 | String | | |

### [GET] `/specialchannels/{:id}`

單一特輯資訊

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

### [PUT] `/specialchannels/{:id}`

更新單一特輯

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 特輯的標題 | String | | |
| MainPhoto | 特輯的主圖(Image) | ObjectId | | |
| newsList | 新聞 ObjectId 陣列 | [ObjectId]  | √ | |
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters

None

### [DELETE] `/specialchannels/{:id}`

刪除單一特輯

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters

None

## INDEXPAGE API DOCUMENT

### [GET] `/indexpage`

取得首頁管理相關資訊

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

### [PUT] `/indexpage/carousels`

更新首頁輪播圖

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| carousels | 新聞 ObjectId 陣列 | [ObjectId] | √ | |
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters

None

### [PUT] `/indexpage/specialtopics`

更新首頁專題

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| specialTopics | 專題 ObjectId 陣列 | [ObjectId] | √ | |
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters

None

### [PUT] `/indexpage/specialchannels`

更新首頁特輯

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| specialchannels | 特輯 ObjectId 陣列 | [ObjectId] | √ | |
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters

None

### [PUT] `/indexpage/videos`

更新首頁影片

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| videos | 影片 ObjectId 陣列 | [ObjectId] | √ | |
| UpdatedBy | 更新者 | ObjectId | √ | |

#### Query Parameters

None

## PREIVEW API DOCUMENT

### [POST] `/previews`

將預覽資料存入 redis

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 新聞標題 | String | | |
| MainMenu | 主選單 object | Object | | |
| newsBy | 訊頭 | String | | |
| MainPhoto | 主圖 Object | Object | | |
| MainVideo | 主影音 Object | Object | | |
| content | 新聞內容 | String | | |
| Photos | 圖片 | Object | | |
| Videos | 影音 | Object | | |
| type | 新聞的類別 | String | | |

#### Query Parameters

None

## STATISTICS API DOCUMENT

- 取得所有中心與其發稿新聞總數與 pageview
- 取得中心所有成員與其發稿新聞總數與 pageview
- 取得某成員與其發稿新聞列表與 pageview

### [GET] `/statistics/centers`

取得所有中心與其發稿新聞總數與 pageview

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
| startedAt | 開始時間(預設為當天 00:00) | Date | | |
| endedAt | 結束時間(預設為當天 23:59) | Date | | |

### [GET] `statistics/centers/{:id}`

取得中心所有成員與其發稿新聞總數與 pageview

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 某個 center objectId | ObjectId | √ | |

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| startedAt | 開始時間(預設為當天 00:00) | Date | | |
| endedAt | 結束時間(預設為當天 23:59) | Date | | |

### [GET] `statistics/users/{:id}`

取得某成員與其發稿新聞列表與 pageview

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 某個 user objectId | ObjectId | √ | |

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| startedAt | 開始時間(預設為當天 00:00) | Date | | |
| endedAt | 結束時間(預設為當天 23:59) | Date | | |


## POST BOARD API DOCUMENTS

- 留言版 CRUD 的 API

### [POST] `/postBoard`

建立貼文的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

NONE

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| content | 貼文內容 | String | √ | |
|---|---|---|---|---|
| CreatedBy | 某個 user objectId| String | √ | |

#### Query Parameters

None


### [GET] `/postBoard`

搜尋貼文列表 的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

NONE

#### Body Parameters

None

#### Query Parameters

None

### [GET] `/postBoard/{:id}`

搜尋貼文的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | postBoard 的 ObjectId | String | √ |  |

#### Body Parameters

None

#### Query Parameters

None


### [PUT] `/postBoard/{:id}`

更新貼文內容及留言的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | postBoard 的 ObjectId | String | √ |  |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| content | 修改貼文內容 | String | | |
|---|---|---|---|---|
| message | 新增此篇貼文的留言內容 | String | | |
|---|---|---|---|---|
| UpdatedBy | 某個 user objectId | String | √ | |

#### Query Parameters

None


### [DELETE] `/postBoard/{:id}`

刪除此貼文的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | postBoard 的 ObjectId | String | √ |  |

#### Body Parameters

None

#### Query Parameters

None


### [DELETE] `/postBoard/{:id}/message`

刪除此貼文中單筆留言的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | postBoard 的 ObjectId | String | √ |  |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| messageId | 此篇帖文的 objectId | String | √ | |
|---|---|---|---|---|
| UpdatedBy | 某個 user objectId | String | √ | |

#### Query Parameters

None

## SCORES BOARD API DOCUMENTS

### [GET] `/scores`

取得某個 menu 所有新聞列表與其分數

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 某個 user objectId | ObjectId | √ | |

#### Body Parameters

None

#### Query Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| menuId | 某個 menu 的 ObjectId | ObjectId | √ | |
| startedAt | 開始時間(預設為當天 00:00) | Date | | |
| endedAt | 結束時間(預設為當天 23:59) | Date | | |
| sort | 排序(預設為 `-startedAt`) | String | | |

### [PUT] `/scores/{:newsId}`

更新某一則新聞的權重分數

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| newsId | 新聞的 ObjectId | ObjectId | √ | |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| weightedScore | 欲加權的分數 | Number | √ | |

#### Query Parameters

None

### [POST] `/dailyPlan`

建立稿單的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

NONE

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 稿單標題 | String | √ | |
| CreatedBy | 某個 user objectId| String | √ | |
| startedAt | 新聞日期 | String | √ | |
| content | 稿單內容 | String |  | |
| Center | 某個 Center objectId | String | √ | |

#### Query Parameters

None

### [GET] `/dailyPlan`

取得稿單列表的 API

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

### [GET] `/dailyPlan/{:id}`

取得單個稿單的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | dailyPlan 的 ObjectId | String | √ |  |

#### Body Parameters

None

#### Query Parameters

None

### [PUT] `/dailyPlan/{:id}`

更新稿單的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | dailyPlan 的 ObjectId | String | √ |  |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 修改的稿單標題 | String | √ | |
| startedAt | 修改的新聞日期 | String | √ | |
| content | 修改的稿單內容 | String |  | |
| Center | 修改的某個 Center objectId | String | √ | |

#### Query Parameters

None

### [DELETE] `/dailyPlan/{:id}`

刪除此稿單的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | dailyPlan 的 ObjectId | String | √ |  |

#### Body Parameters

None

#### Query Parameters

None

### [POST] `/dailyPlan/{:id}/comment`

建立稿單回應的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | dailyPlan 的 ObjectId | String | √ |  |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| content | 回應內容 | String |  | |
| name | 回應者名稱 | String |  | |
| createdBy | 建立者的 User ObjectId | String |  | |

#### Query Parameters

None

### [DELETE] `/dailyPlan/{:id}/comment`

刪除稿單回應的 API

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | dailyPlan 的 ObjectId | String | √ |  |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| commentIndex | comments Array 的index值 | String | √ | |

#### Query Parameters

None

## APP API DOCUMENTS

### [POST] `/app/version`

增加 app 版本號

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| version | app 版本 | String | √ | `v1.0.1` |
| os | 作業系統 | String | √ | `['IOS', 'ANDROID']` |
| device | 裝置 | String | √ | `['PHONE', 'TABLET']` |
| CreatedBy | 建立者 | String | √ |  |

#### Query Parameters

None

### [GET] `/app/version`

所有 app 版本號

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

### [POST] `/app/splash`

上傳 app 首圖

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'YouCanSeeMeJohnCena' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| device | 裝置 | String | √ | `PHONE` |
| imageId | Image 物件的 ObjectId | ObjectId | √ | |
| CreatedBy | 建立者 | String | √ |  |

#### Query Parameters

None

### [GET] `/app/splash`

查看 app 首圖

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
| device | 裝置 | String | | `/app/splash?device=PHONE` |

### [POST] `/app/notification/ios`

送出所有 ios 的推播

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 新聞的標題 | String | √ | |
| summary | 新聞的摘要 | String | √ | |
| image | 圖片的連結 | String | √ | |
| url | 新聞的 url | String | √ | |

#### Query Parameters

None

### [POST] `/app/notification/andriod`

送出所有 android 的推播

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 新聞的標題 | String | √ | |
| summary | 新聞的摘要 | String | √ | |
| image | 圖片的連結 | String | √ | |
| url | 新聞的 url | String | √ | |

#### Query Parameters

None

### [GET] `/policies/group`

取得所有個角色的權限

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

### [GET] `/policies/check`

確認這個角色有沒有這個端點權限

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
| path | 路徑 | String | √ | '/dailyplan/create' |
| roleId | 角色id | String | √ | '520000000000000000000001' |

## OTT API DOCUMENTS

### [POST] `/ott/providers`

新增 OTT 平台資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| platform | 平台名稱 | String | √ | 'NOWNEWS' |
| watchTime | 觀看時間 | Number | | |
| lockTime | 鎖定時間 | Number | | |
| watchable | 可否觀看 | Boolean | | |
| icon | 圖示的連結 | String | | |
| titleMessage | 標題 | String | | |
| downloadable | 可否下載 | Boolean | | |
| iosDownloadLink | IOS 下載連結 | String | | |
| androidDownloadLink | Android 下載連結 | String | | |
| videoAD | 影音廣告設定 | Boolean | | |
| rightbutton | 右邊按鈕文字設定 | String | | |
| leftbutton | 左邊按鈕文字設定 | String | | |
| CreatedBy | 建立者 | ObjectId | | |

#### Query Parameters

None

### [GET] `/ott/providers`

取得 OTT 平台所有資料

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

### [PUT] `/ott/providers/{:id}`

更新某一個平台的資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 某一個平台的 ObjectId | ObjectId | √ | |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| watchTime | 觀看時間 | Number | | |
| lockTime | 鎖定時間 | Number | | |
| watchable | 可否觀看 | Boolean | | |
| icon | 圖示的連結 | String | | |
| titleMessage | 標題 | String | | |
| downloadable | 可否下載 | Boolean | | |
| iosDownloadLink | IOS 下載連結 | String | | |
| androidDownloadLink | Android 下載連結 | String | | |
| videoAD | 影音廣告設定 | Boolean | | |
| rightbutton | 右邊按鈕文字設定 | String | | |
| leftbutton | 左邊按鈕文字設定 | String | | |
| UpdatedBy | 更新者 | ObjectId | | |

#### Query Parameters

None

### [GET] `/ott/providers/{:id}`

取得單一平台資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 某一個平台的 ObjectId | ObjectId | √ | |

#### Body Parameters

None

#### Query Parameters

None

### [POST] `/ott/categories`

新增某個平台的分類

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| name | 分類名稱 | String | | |
| categoryName | 分類顯示名稱 | String | √ | |
| providerId | 平台的 ObjectId | ObjectId | √ | |
| CreatedBy | 建立著的 ObjectId | ObjectId | √ | |

#### Query Parameters

None

### [DELETE] `/ott/categories/{:id}`

刪除某個分類

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 分類的 ObjectId | ObjectId | | |

#### Body Parameters

None

#### Query Parameters

None

### [POST] `/ott/channels`

新增某個頻道

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| title | 頻道標題 | String | | |
| path | 頻道源的路徑 | String | | |
| categoryId | 分類的 ObjectId | ObjectId | √ | |
| providerId | 平台的 ObjectId | ObjectId | √ | |
| CreatedBy | 建立著的 ObjectId | ObjectId | √ | |

#### Query Parameters

None

### [DELETE] `/ott/channels/{:id}`

刪除某個頻道

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| id | 頻道的 ObjectId | ObjectId | | |

#### Body Parameters

None

#### Query Parameters

None

### [PUT] `/ott/weight`

更新分類與頻道的排序

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-API | 驗證是否有存取 api 權限的 token，目前為固定的值 | String | √ | request.header['X-NOWnews-API'] = 'NOWnewsIsFeature' |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 必填 | 範例 |
|---|---|---|---|---|
| categoryArray | 分類的物件陣列 | Object | √ | `[{ _id: 'xxxxx', weight: 1 }, { _id: 'ooooo', weight: 2 }]` |
| channelArray | 頻道的物件陣列 | Object | √ | `[{ _id: 'aaaaa', weight: 1 }, { _id: 'bbbbbb', weight: 2 }]` |

#### Query Parameters

None
