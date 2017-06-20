import Promise from 'bluebird';
import redis from 'redis';
import config from 'config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const host = config.get('admin.redis.host');
const port = config.get('admin.redis.port');
const db = config.get('admin.redis.db');
const password = config.get('admin.redis.password');

let options = {
    host: host,
    port: port,
    db: db
};

if(password !== null) {
    options.password = password;
}

const client = redis.createClient(options);

module.exports =  client;