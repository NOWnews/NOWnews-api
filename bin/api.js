require('babel-core/register');
require('babel-polyfill');
// require('../global');
const chalk = require('chalk');
const http = require('http');

const api = require('../api/app.js');

const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || '10000';
api.set('port', port);

const server = http.createServer(api);

server.listen(port);
console.log(chalk.red(`-------------------------------`));
console.log(chalk.red(`Start NOWott api`));
console.log(chalk.red(`Listen Port ${port}`));
console.log(chalk.red(`${env} mode`));
console.log(chalk.red(`-------------------------------`));