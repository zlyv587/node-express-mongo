/**
 * Module dependencies.
 */

var express = require('express')
    , util = require('util')
    , routes = require('./routes')
    ,MongoStore = require('connect-mongo')
    ,settings = require('./settings.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: settings.cookieSecret,
        db: settings.db,
    }));
    app.use(express.router(routes));
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

app.helpers({
    inspect: function (obj) {
        return util.inspect(obj, true);
    }
});
app.dynamicHelpers({
    user: function (req, res) {
        return req.session.user;
    },
    error: function (req, res) {
        var error = req.flash('error');
        if (error.length) {
            return err;
        }
        return null;
    },
    success: function(req, res) {
        var succ = req.flash('success');
        if (succ.length) {
            return succ;
        }
        return null;
    }
});
app.listen(3000, function () {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
