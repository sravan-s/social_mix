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

// authnticates user
userMagmt.authUser = function (dat) {
    function returnData(err, res, promiseFullfill, promiseRej) {
        if(err) {
            promiseRej(errors.createErrMsg(false, err));
        } else {
            if(!!dat) {
                res.uname = krypt.decrypt(res.uname);
                res.pwd = krypt.decrypt(res.pwd);
                promiseFullfill(res);
            }
        }
    }
    return new promise((fullfill, reject) => {
        if(!dat.uname || !dat.pwd) {
            reject(errors.createErrMsg(false, "Username or password missing"));
        } else {
            if(dat.type == "admin") {
                models.Admin.findOne((err, dat) => {
                    returnData(err, dat, fullfill, reject);
                });
            } else if(dat.type = "user"){
                let query = {
                    uname: dat.uname,
                    pwd: dat.pwd
                };
                models.User.findOne(query, (err, dat) => {
                    if(dat) {
                        returnData(err, dat, fullfill, reject);
                    } else {
                        returnData("User not found", dat, fullfill, reject);
                    }
                });
            } else {
                reject(errors.createErrMsg(false, "User type missing"));
            }
        }
    });
};

module.exports = userMagmt;
