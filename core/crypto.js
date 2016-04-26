'use strict';
const CONFIG = require('./../config');
const CryptoJS = require('crypto-js');

let krypt ={};

krypt.encrypt = function(text) {
    return CryptoJS.AES.encrypt(text, CONFIG.SECRETKEY).toString();
};

krypt.decrypt = function(text) {
    let bytes = CryptoJS.AES.decrypt(text, CONFIG.SECRETKEY),
        plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

module.exports = krypt;
