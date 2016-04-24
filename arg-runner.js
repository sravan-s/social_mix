'use strict';

const userMgmt = require('./core/user-mgmt');
const prompt = require('prompt');
const schema = {
    properties: {
        username: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Name must be only letters, spaces, or dashes',
            required: true
        },
        password: {
            hidden: true,
            required: true
        }
    }
};

let cmds = {};

if (process.argv[2] == "--clear-all") {
    userMgmt.clearData();
}

cmds.getAdminPromt = function () {
    prompt.start();
    prompt.get(schema, function (err, result) {
        if (!err) {
            userMgmt
                .makeAdmin(result.username, result.password)
                .then((sucess) => {
                    console.log("Sucessfully added, please restart server");
                    process.exit();
                }, (failure) => {
                    console.log(failure);
                });
        } else {
            throw err;
        }
    });
}

module.exports = cmds;
