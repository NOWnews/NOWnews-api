import iconv from 'iconv-lite';

module.exports = (ad, id) => {
    let result = {img: '', title: '', url: ''};
    try {
        const adString = iconv.decode(new Buffer(ad), 'BIG5');
        result = JSON.parse(adString);
    } catch (e) {

    }

    return { id, ...result };


};
