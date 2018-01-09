import config from 'config';
import Debug from 'debug';
const debug = Debug('NOWnews-api:libs:formatImage');
const imgRegexString = /^(http|https):\/\/img.nownews.com\/nownews_[A-Za-z1-9]+\/[A-Za-z]+\//;
const otherRegexString = /^(http|https):\/\/[A-Za-z]+.nownews.com\//;
const imgLabUrl = config.get('general.imagelab.url');
const googleUrl = config.get('general.googleCloud.image-cdn-url');
const googleFolder = config.get('general.googleCloud.image-gcs-folder');

module.exports.googleCDN = (url) => {
    const imgMatchArray = url.match(imgRegexString);
    const otherMatchArray = url.match(otherRegexString);

    // 如果不屬於 http://xxx.nownews.com 的圖片網址
    if(imgMatchArray === null && otherMatchArray === null) {
        return url;
    }

    // 如果是 http://img.nownews.com 的圖片網址
    if(imgMatchArray) {
        const replaceString = imgMatchArray[0];
        const fileName = url.replace(replaceString, '');
        return `${googleUrl}/${googleFolder}/${fileName}`;
    }

    // 如果是 http://[A-Za-z].nownews.com 的圖片網址
    if(otherMatchArray) {
        return `${imgLabUrl}/?w=1080&q=100&src=${encodeURIComponent(url)}`;
    }
};

module.exports.sizeFormat = (url) => {

    const imgMatchArray = url.match(imgRegexString);
    const otherMatchArray = url.match(otherRegexString);

    // 如果圖片都不為 xxx.nownews.com
    if(otherMatchArray === null && imgMatchArray === null) {
        return {
            w300q70: url,
            w360q70: url,
            w540q70: url,
            w640q70: url,
            w720q70: url,
            w750q70: url,
            w1080q85: url,
            w1440q85: url
        };
    }
 
    // 如果圖片是img.nownews.com
    if(otherMatchArray && imgMatchArray) {

        const replaceString = imgMatchArray[0];
        const fileName = url.replace(replaceString, '');
        return {
            w300q70: `${imgLabUrl}/?w=300&q=70&src=${googleUrl}/${googleFolder}/${fileName}`,
            w360q70: `${imgLabUrl}/?w=360&q=70&src=${googleUrl}/${googleFolder}/${fileName}`,
            w540q70: `${imgLabUrl}/?w=540&q=70&src=${googleUrl}/${googleFolder}/${fileName}`,
            w640q70: `${imgLabUrl}/?w=640&q=70&src=${googleUrl}/${googleFolder}/${fileName}`,
            w720q70: `${imgLabUrl}/?w=720&q=70&src=${googleUrl}/${googleFolder}/${fileName}`,
            w750q70: `${imgLabUrl}/?w=750&q=70&src=${googleUrl}/${googleFolder}/${fileName}`,
            w1080q85: `${imgLabUrl}/?w=1080&q=85&src=${googleUrl}/${googleFolder}/${fileName}`,
            w1440q85: `${imgLabUrl}/?w=1440&q=85&src=${googleUrl}/${googleFolder}/${fileName}`
        };
    }

    // 如果圖片是不是 img.nownews.com 但符合 xxx.nownews.com 的規範
    if(otherMatchArray && imgMatchArray === null) {
        return {
            w300q70: `${imgLabUrl}/?w=300&q=70&src=${url}`,
            w360q70: `${imgLabUrl}/?w=360&q=70&src=${url}`,
            w540q70: `${imgLabUrl}/?w=540&q=70&src=${url}`,
            w640q70: `${imgLabUrl}/?w=640&q=70&src=${url}`,
            w720q70: `${imgLabUrl}/?w=720&q=70&src=${url}`,
            w750q70: `${imgLabUrl}/?w=750&q=70&src=${url}`,
            w1080q85: `${imgLabUrl}/?w=1080&q=85&src=${url}`,
            w1440q85: `${imgLabUrl}/?w=1440&q=85&src=${url}`
        };
    }

    // const imgMatchArray = url.match(imgRegexString);

    // if(imgMatchArray === null) {
    //     return {
    //         w300q70: url,
    //         w360q70: url,
    //         w540q70: url,
    //         w640q70: url,
    //         w720q70: url,
    //         w750q70: url,
    //         w1080q85: url,
    //         w1440q85: url
    //     };
    // }

    // return {
    //     w300q70: `${imgLabUrl}/?w=300&q=70&src=${url}`,
    //     w360q70: `${imgLabUrl}/?w=360&q=70&src=${url}`,
    //     w540q70: `${imgLabUrl}/?w=540&q=70&src=${url}`,
    //     w640q70: `${imgLabUrl}/?w=640&q=70&src=${url}`,
    //     w720q70: `${imgLabUrl}/?w=720&q=70&src=${url}`,
    //     w750q70: `${imgLabUrl}/?w=750&q=70&src=${url}`,
    //     w1080q85: `${imgLabUrl}/?w=1080&q=85&src=${url}`,
    //     w1440q85: `${imgLabUrl}/?w=1440&q=85&src=${url}`
    // };
};

module.exports.thumbnail = (url) => {
    // const imgRegexString = /^(http|https):\/\/img.nownews.com\//;
    // const imgMatchArray = url.match(imgRegexString);
    const otherMatchArray = url.match(otherRegexString);

    // 如果不屬於 http://xxx.nownews.com 的圖片網址
    if(otherMatchArray === null) {
        return url;
    }

    // 如果是 http://img.nownews.com 的圖片網址
    // if(imgMatchArray) {
    //     const replaceString = imgMatchArray[0];
    //     const srcUrl = url.replace(replaceString, '/');
    //     return `${imgLabUrl}/?w=300&q=70&src=${encodeURIComponent(srcUrl)}`;
    // }

    // 如果是 http://[A-Za-z].nownews.com 的圖片網址
    if(otherMatchArray) {
        return `${imgLabUrl}/?w=300&q=70&src=${encodeURIComponent(url)}`;
    }
};
