const express = require('express');
const app = express();
const router = require('./core-routes');
const CONFIG = require('./../config');
const bodyParser = require('body-parser');

//Sets custom views, assets folder etc
app.set('view engine', CONFIG.VIEW_ENGINE);
app.use(express.static('public'));

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Various imports
 */
app.use(router.admin);
app.use(router.user);
app.use(router.api);
app.use(router.common);

module.exports = app;
