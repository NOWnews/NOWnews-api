require('babel-core/register');
require('babel-polyfill');

const chalk = require('chalk');
const http = require('http');

const api = require('../api-web/app.js');

const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || '10001';
api.set('port', port);

const server = http.createServer(api);

server.listen(port);
console.log(chalk.green(`-------------------------------`));
console.log(chalk.green(`Start NOWnews Web Api`));
console.log(chalk.green(`Listen Port ${port}`));
console.log(chalk.green(`${env} mode`));
console.log(chalk.green(`-------------------------------`));