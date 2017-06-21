import iconv from 'iconv-lite';

module.exports = (ad) => {
    try {
        const adString = iconv.decode(new Buffer(ad), 'BIG5');
        return JSON.parse(adString);
    } catch (e) {
        return {
            img: '',
            title: '',
            url: ''
        }
    }
};
