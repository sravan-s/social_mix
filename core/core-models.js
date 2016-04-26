'use strict';

const mongoose = require('mongoose');
const CONFIG = require('./../config');

mongoose.connect('mongodb://localhost/' + CONFIG.db);

let models = {};

// Admin
models.Admin = mongoose.model('Admin', {
    uname: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }
});

// User
models.User = mongoose.model('User', {
    uname: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }
});

// Account
models.Account = mongoose.model('Account', {
    uname: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }
});

module.exports = models;
