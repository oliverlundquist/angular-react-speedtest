var compression = require('compression');
var express = require('express');
var r = require('rethinkdb');
var app = express();

// app.use(compression());
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    r.connect('192.168.100.111', function(error, conn) {
        console.log('opening');
        if (error) {
            handleError(res, error);
        }
        else {
            req._rdbConn = conn;
            next();
        }
    });
});

app.get('/orders', function (req, res, next) {
    // r.db('orders').table('orders').limit(1000).run(req._rdbConn, function (err, _res) {
    // r.db('orders').table('orders').pluck('colorme_id', { 'customer': ['email', 'name'] }).limit(1000).run(req._rdbConn, function (err, _res) {
    r.db('orders').table('orders').orderBy({index:'order_status_id'}).pluck('colorme_id', { 'customer': ['email', 'name'] }).limit(1000).run(req._rdbConn, function (err, _res) {
        _res.toArray(function (err, __res) {
            res.send(__res);
            next();
        });
    });
});

app.use(function (req, res, next) {
    console.log('closing');
    req._rdbConn.close();
});

function handleError(res, error) {
    return res.send(500, {error: error.message});
};

app.listen(8080);
console.log('Listening on port 8080');
