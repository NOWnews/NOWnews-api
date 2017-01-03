import Promise from 'bluebird';
import redis from 'redis';
import config from 'config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const host = config.get('redis.host');
const port = config.get('redis.port');

const client = redis.createClient({
    host: host,
    port: port
});

module.exports =  client;