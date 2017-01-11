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
| nickname | 暱稱 | String | √ | `John Cena` |
| staffId | 員工編號 | String | √ | `NN00123` |
| email | email | String | √ | `simon.sun@nownews.com` |
| password | 密碼 | String |√  | `abc123` |
| Role | 角色的 ObjectId | ObjectId |  | `520000000000000000000001` |
| phone | 電話 | String  |  | `(02)2222-1111` |
| Center | 中心的 ObjectId | ObjectId  |  | `550000000000000000000001` |
| Department | 部門的 ObjectId | ObjectId  |  | `540000000000000000000001` |
| jobTitle | 職稱 | String  | √ | `工程師` |
| profileLink | 個人資料連結 | String  |  | |
| avatar | 大頭照 | String  |  | |
| CreatedBy | 建立者 ObjectId | ObjectId  | √ | `530000000000000000000001` |

#### Query Parameters

## ROLE API DOCUMENTS

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

#### Query Parameters