const {customAlphabet} = require('nanoid');

// const nanoid = customAlphabet('1234567890abcdef', 5)
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomNumber = Math.floor(Math.random()*2) + 5;

const nanoid = customAlphabet(alphabet, randomNumber);

function generateShortCode() {
    let url = nanoid();
    return url;
}

module.exports = generateShortCode;