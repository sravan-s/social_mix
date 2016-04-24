// Crypto is a service for user management and auth 
'use strict';

const promise = require('promise');
const models = require('./core-models');
const CONFIG = require('./../config');
const krypt = require('./crypto');
const errors = require('./error-msgs');

let key = "";
let userMagmt = {};

// Reads secret key from db 
userMagmt.getAdmin = function () {
    return new promise((fullfill, reject) => {
        models.Admin.findOne((err, dat) => {
            if(err) {
                reject(errors.createErrMsg(false, err));
            } else {
                if(!!dat) {
                    fullfill(true);
                } else {
                    fullfill(false);
                }
            }
        });
    });
};

// Clear admin details
userMagmt.clearData = function (type) {
    function clearCollection(m) {
        m.remove({}, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log("cleared");
            }
        });
    }
    let modelTypes = ['Admin', 'User', 'Account'];

    //Clears all data
    if(!type) {
        modelTypes.forEach((type) => {
            clearCollection(models[type]);
        });
        return;
    }
    
    //Clears specific data
    for(let i = 0; i < modelTypes.length; i++) {
        if(type == modelTypes[i]) {
            clearCollection(models[modelTypes[i]]);
            return;
        }
    }
};

// Creates admin credentials
userMagmt.makeAdmin = function (uname, pwd) {
    return new promise((fullfill, reject) => {
        if(!uname || !pwd) {
            reject(errors.createErrMsg(false, "Username or password missing"));
        } else {
            let admin = new models.Admin({
                uname: krypt.encrypt(uname),
                pwd: krypt.encrypt(pwd)
            });

            admin.save((err) => {
                if(err) {
                    reject(errors.createErrMsg(false, err));
                } else {
                    fullfill({
                        success: true,
                        message: "Sucessfully added admin"
                    });
                }
            });
        }    
    });    
};

// Get user creds
userMagmt.getUser = function (uname, pwd, type) {
    function returnData(err, dat, promiseFullfill, promiseRej) {
        if(err) {
            promiseRej(errors.createErrMsg(false, err));
        } else {
            if(!!dat) {
                dat.uname = krypt.decrypt(dat.uname);
                dat.pwd = krypt.decrypt(dat.pwd);
                promiseFullfill(dat);
            }
        }
    }
    return new promise((fullfill, reject) => {
        if(!uname || !pwd) {
            reject(errors.createErrMsg(false, "Username or password missing"));
        } else {
            if(type == "admin") {
                models.Admin.findOne((err, dat) => {
                    returnData(err, dat, fullfill, reject);
                });
            } else {
                models.User.findOne((err, dat) => {
                    returnData(err, dat, fullfill, reject);
                });
            }
        }
    });
};

module.exports = userMagmt;
