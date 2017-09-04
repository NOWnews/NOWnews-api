import axios from 'axios';
import fs from 'fs';
import Promise from 'bluebird';
import path from 'path';
import uuidv4 from 'uuid/v4';
import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:downloadFile');

module.exports = (url) => {
    return new Promise((resolve, reject) => {
        let dirPath = 'uploads';
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
        let fileDest = path.join(dirPath);
        let fileName = uuidv4();
        let filePath = path.join(fileDest, fileName);
        axios.get(url, {
            responseType: 'arraybuffer'
        }).then(response => {
            fs.writeFile(filePath, new Buffer(response.data, 'binary'), "binary", err => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(filePath);
                }
            });
        }).catch(err => {
            return reject(err);
        });
    })
};
