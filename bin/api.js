require('babel-core/register');
require('babel-polyfill');
// require('../global');
const http = require('http');

const api = require('../api/app.js');

const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || '10000';
api.set('port', port);

const server = http.createServer(api);

server.listen(port);
console.log(`-------------------------------`);
console.log(`Start NOWott api`);
console.log(`Listen Port ${port}`);
console.log(`${env} mode`);
console.log(`-------------------------------`);