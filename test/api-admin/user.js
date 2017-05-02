import request from 'request';
import querystring from 'querystring';
import http from 'http';
import {assert} from 'chai'

describe('User', function() {

  describe('#log in()', function() {

    it('should log in with error.', function(done) {    
      const data = querystring.stringify({'email': 'test@nownews.com', 'password': '111111'}); 
      const options = {
          host: 'localhost',
          path: '/users/login' ,
          method: 'POST',
          port: 10000,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(data)
          }
      }

      const req = http.request(options, function (res) {
      	assert.equal(res.statusCode, 404);
        done();
      })
      
      req.write(data);
      req.end();

    });

    it('should log in with 200 res code.', function(done) {    
      const data = querystring.stringify({'email': 'superuser@nownews.com', 'password': 'superuser28331543'}); 
      // Configure the request
      const options = {
          host: 'localhost',
          path: '/users/login' ,
          method: 'POST',
          port: 10000,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(data)
          }
      }

      const req = http.request(options, function (res) {
      	assert.equal(res.statusCode, 200);
        done();
      })
      
      req.write(data);
      req.end();

    });

    

  });

});