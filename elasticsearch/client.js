import elasticsearch from 'elasticsearch';
import config from 'config';
const host = config.get('general.elasticsearch');
const client = new elasticsearch.Client({
  host
});

module.exports =  client;