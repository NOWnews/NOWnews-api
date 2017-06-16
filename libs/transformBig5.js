import iconv from 'iconv-lite';

module.exports = (ad) => {
    const adString = iconv.decode(new Buffer(ad), 'BIG5');
    return JSON.parse(adString);
};
