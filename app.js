const CONFIG = require('./config');
const app = require('./core');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const userMgmt = require('./core/user-mgmt');
const args = require('./arg-runner');

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
