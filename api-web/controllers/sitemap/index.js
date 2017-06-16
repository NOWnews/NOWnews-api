
import express from 'express';
let router = express.Router();
import google from './google';
import googleSSL from './googleSSL';
import newsSitemap from './newsSitemap';

router.route('/sitemap/google')
    .get(google);

router.route('/sitemap/googleSSL')
    .get(googleSSL);

router.route('/sitemap/newsSitemap')
    .get(newsSitemap);

module.exports = router;