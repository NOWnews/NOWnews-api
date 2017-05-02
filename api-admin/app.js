import express from 'express';
let app = express();

import initDataStart from '../initData/start';
import middlewares from './middlewares';
import controllers from './controllers';
import errorHandlers from './errorHandlers';

// 初始化資料
if (process.env.NODE_ENV !== "test") {
    initDataStart();
}


// middlewares
app.use(middlewares(app));

// controllers
app.use(controllers(app));

// errorHandles
app.use(errorHandlers(app));

module.exports = app;
