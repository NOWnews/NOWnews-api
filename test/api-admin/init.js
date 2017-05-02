require('babel-core/register');
require('babel-polyfill');

before(function(done) {
    // Start Http Server
    process.env.NODE_ENV = 'test';
    this.config = require('config');
    this.mongoose = require('mongoose');
    const chalk = require('chalk');
    this.http = require('http');
    this.api = require('../../api-admin/app.js');
    this.env = process.env.NODE_ENV || 'test';
    this.port = process.env.PORT || '10000';
    this.server = this.api.listen(this.port, done);
    
});

beforeEach(function() {
    // Init Data
    const initData = require('../../initData/start.js');   
    return initData();
});


afterEach(function(done) {
    // Drop Data
    this.host = this.config.admin.mongodb.host;
    this.db = this.config.admin.mongodb.db;
    this.connection = this.mongoose.createConnection(this.host+'/'+this.db);
    let that = this;
    this.connection.on('connected', function() {
        that.connection.db.dropDatabase(function(err) {
            if(err){
                done(err);
            }
            that.connection.close(done);
            
        });
    });
});

after(function(done) {
    // Shutdown Server
    this.server.close(done);
});