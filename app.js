const CONFIG = require('./config');
const app = require('./core');
const fs = require('fs');
const express = require('express');
const userMgmt = require('./core/user-mgmt');
const args = require('./arg-runner');


/**
 * Initial configuration of server
 */
userMgmt
    .getAdmin()
    .then(function(uinfo) {
        if(uinfo) {
            app.listen(3000, () => {
                console.log('App started on port 3000!, in', CONFIG.MODE, "mode.");
            });
        } else {
            args.getAdminPromt();
        }
    });
