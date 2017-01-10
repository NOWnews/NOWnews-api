# NOWnews api

NOWnews 新版前後台專用 api

## 啟動

- develop 模式: `npm run api`
- staging 模式: `NODE_ENV=staging pm2 start ./bin/api --name 'NOWnews-api-staging'`
- production 模式: `NODE_ENV=production pm2 start ./bin/api --name 'NOWnews-api-production'`