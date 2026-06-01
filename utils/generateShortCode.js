const {customAlphabet} = require('nanoid');

const nanoid = customAlphabet('1234567890abcdef', 5)


function generateShortCode() {
    let url = nanoid();
    return url;
}

module.exports = generateShortCode;