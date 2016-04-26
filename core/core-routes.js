const express = require('express');
const helpers = require('./core-helpers');
const adminRouter = express.Router();
const userRouter = express.Router();
const APIRouter = express.Router();
const commonRoutes = express.Router();
const userMgmt = require('./user-mgmt');
const promise = require('promise');

/**
 * Web routes - Admin
 */
adminRouter.use( (req, res, next) => {
    if(helpers.isAdmin(req)) {
        next();
    } else {
        res.go('/login');
    }
});
adminRouter.get('/admin-dash', (req, res) => {
    res.render('admin-dash.jade');
});


/**
 * Web routes - user
 */
userRouter.use( (req, res, next) => {
    if(helpers.isUser(req)) {
        next();
    } else {
        res.go('/login');
    }
});
userRouter.get('/user-dash', (req, res) => {
    res.render('index.jade');
});


/**
 * API routes - (Note: Auth is in common routes)
 */
APIRouter.post('/', (req, res) => {
    res.send({
        "success": "false",
        "message": "welcome"
    });
});
APIRouter.get('/uinfo', (req, res) => {
    console.log(req);
});

/**
 * Common routes, no auth
 */
commonRoutes.get('/login', (req, res) => {
    res.render('login.jade');
});
commonRoutes.get('/admin-login', (req, res) => {
    res.render('login.jade');
});
// Auth is placed here because
// Auth doesn't need prior authentication
commonRoutes.post('/auth', (req, res) => {
    userMgmt
        .authUser(req.body)
        .then((dat) => {
            console.log(dat);
            res.send(dat);
        }, (err) => {
            console.log(err);
            res.send(err);
        });
});
//Handling invalid routes
commonRoutes.get('/*', function(req, res) {
    res.redirect('/login');
});

module.exports = {
    admin: adminRouter,
    user: userRouter,
    api: APIRouter,
    common: commonRoutes
};
