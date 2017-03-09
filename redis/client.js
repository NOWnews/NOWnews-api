import Promise from 'bluebird';
import redis from 'redis';
import config from 'config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const host = config.get('admin.redis.host');
const port = config.get('admin.redis.port');
const db = config.get('admin.redis.db');

const client = redis.createClient({
    host: host,
    port: port,
    db: db
});

module.exports =  client;