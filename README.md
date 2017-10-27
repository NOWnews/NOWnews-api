
# NOWnews-api

## Server Prepare

Update all packages on ubuntu16.04:

`$ sudo apt-get -y update && sudo apt-get -y upgrade`

Install dependences:

`$ sudo apt-get install build-essential g++ make python2.7 git graphicsmagick`

Install locale:

`$ sudo locale-gen "zh_TW.UTF-8"`

Setting locales:

`$ sudo dpkg-reconfigure locales`

Get **NVM**:

`$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`

Reload ~/.bashrc:

`$ source ~/.bashrc`

Install Node.js:

`$ nvm install 7`

Update **NPM**:

`$ npm install npm -g`

Install **pm2** and **node-gyp**:

`$ npm install pm2@latest node-gyp -g`

Clone project:

`$ git clone git@github.com:NOWnews/NOWnews-api.git`

Setting python version for **NPM**:

`$ npm config set python python2.7`

Install project packages:

`$ npm install`

Start server by cluster mode:

`$ NODE_ENV=staging pm2 start bin/api-admin.js -i max --name 'api-admin-staging'`

or

pm2 start pm2/api-admin.json --env staging

*note: if you start server at first time. you should following these steps:*

`$ NODE_ENV=staging pm2 start bin/api-admin.js -i 1 --name 'api-admin-staging'`

`$ pm2 scale api-admin-staging 4`

## Api Documents

[Admin APIS](documents/api-admin.md)

[Web APIS](documents/api-web.md)