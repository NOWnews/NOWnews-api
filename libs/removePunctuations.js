module.exports = (string) =>{

    let pureString = string.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\，|\。|\（|\）|\「|\」|\《|\》|\、|\：|\；|\／|\？|\?]/g,''); 
    console.log(pureString)
    return pureString;
};