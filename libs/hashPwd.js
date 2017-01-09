
import crypto from 'crypto';

const HASHSTRING = '#$)NOWnews-api +@';

module.exports = (password) => {
    let hashString = HASHSTRING + password;
    return crypto.createHash('md5').update(hashString).digest('hex');
};