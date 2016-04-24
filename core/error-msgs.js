'use strict';

let errors = {};

errors.createErrMsg = function(success, msg) {
    return {
        success: success,
        message: msg
    }
};

module.exports = errors;
