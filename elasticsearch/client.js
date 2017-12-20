import elasticsearch from 'elasticsearch';
import config from 'config';

const client = new elasticsearch.Client({
  host: '35.194.213.72:9200'
  // log: 'trace'
});

module.exports =  client;