var compression = require('compression');
var express = require('express');
var r = require('rethinkdb');
var app = express();

// app.use(compression());
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    r.connect({ host: '192.168.100.111', port: 28015 }, function(error, conn) {
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

app.get('/ordershtml', function (req, res, next) {
    // r.db('orders').table('orders').limit(1000).run(req._rdbConn, function (err, _res) {
    // r.db('orders').table('orders').pluck('colorme_id', { 'customer': ['email', 'name'] }).limit(1000).run(req._rdbConn, function (err, _res) {
    r.db('orders').table('orders').orderBy({index:'order_status_id'}).pluck('colorme_id', { 'customer': ['email', 'name'] }).limit(1000).run(req._rdbConn, function (err, _res) {
        _res.toArray(function (err, __res) {
            res.header("Content-Type", "text/html; charset=utf-8");

            var output = '';

            output += '<div>';
            output += '<script>console.time("renderList");</script>';
            output += '<table border="1">';
            __res.forEach(function (___res) {
                //set placeholders
                if ( ! ___res.payment) { ___res.payment = {}; }
                if ( ! ___res.order_total) { ___res.order_total = {}; }
                if ( ! ___res.order_destinations) { ___res.order_destinations = [{ order_destination_total : {} }]; }
                if ( ! ___res.order_status)  { ___res.order_status = {}; }

                //set defaults
                ___res.customer.email = ___res.customer.email ? ___res.customer.email : '';
                ___res.colorme_id = ___res.colorme_id ? ___res.colorme_id : '';
                ___res.customer.name = ___res.customer.name ? ___res.customer.name : '';
                ___res.order_date = ___res.order_date ? ___res.order_date : '';
                ___res.payment.display_name = ___res.payment.display_name ? ___res.payment.display_name : '';
                ___res.order_total.payment_fee = ___res.order_total.payment_fee ? ___res.order_total.payment_fee : '';
                ___res.order_destinations[0].order_destination_total.shipping_fee = ___res.order_destinations[0].order_destination_total.shipping_fee ? ___res.order_destinations[0].order_destination_total.shipping_fee : '';
                ___res.order_destinations[0].order_destination_total.wrapping_total = ___res.order_destinations[0].order_destination_total.wrapping_total ? ___res.order_destinations[0].order_destination_total.wrapping_total : '';
                ___res.order_destinations[0].wrapping_type = ___res.order_destinations[0].wrapping_type ? ___res.order_destinations[0].wrapping_type : '';
                ___res.order_destinations[0].message_card_name = ___res.order_destinations[0].message_card_name ? ___res.order_destinations[0].message_card_name : '';
                ___res.order_destinations[0].message_card_message = ___res.order_destinations[0].message_card_message ? ___res.order_destinations[0].message_card_message : '';
                ___res.order_destinations[0].memo = ___res.order_destinations[0].memo ? ___res.order_destinations[0].memo : '';
                ___res.order_destinations[0].shipping_memo = ___res.order_destinations[0].shipping_memo ? ___res.order_destinations[0].shipping_memo : '';
                ___res.order_destinations[0].noshi_memo = ___res.order_destinations[0].noshi_memo ? ___res.order_destinations[0].noshi_memo : '';
                ___res.order_destinations[0].invoice = ___res.order_destinations[0].invoice ? ___res.order_destinations[0].invoice : '';
                ___res.order_destinations[0].invoice_number = ___res.order_destinations[0].invoice_number ? ___res.order_destinations[0].invoice_number : '';
                ___res.order_destinations[0].shipping_date = ___res.order_destinations[0].shipping_date ? ___res.order_destinations[0].shipping_date : '';
                ___res.order_destinations[0].preferred_delivery_date = ___res.order_destinations[0].preferred_delivery_date ? ___res.order_destinations[0].preferred_delivery_date : '';
                ___res.order_destinations[0].name = ___res.order_destinations[0].name ? ___res.order_destinations[0].name : '';
                ___res.order_destinations[0].zipcode = ___res.order_destinations[0].zipcode ? ___res.order_destinations[0].zipcode : '';
                ___res.order_total.total = ___res.order_total.total ? ___res.order_total.total : '';
                ___res.returned_date = ___res.returned_date ? ___res.returned_date : '';
                ___res.exchanged_date = ___res.exchanged_date ? ___res.exchanged_date : '';
                ___res.order_status.status_name = ___res.order_status.status_name ? ___res.order_status.status_name : '';

                //build output
                output += '<tr>';
                output += '<td nowrap="nowrap">01: ' + (___res.customer.email) + '</td>';
                output += '<td nowrap="nowrap">02: ' + (___res.colorme_id) + '</td>';
                output += '<td nowrap="nowrap">03: ' + (___res.customer.name) + '</td>';
                output += '<td nowrap="nowrap">04: ' + (___res.order_date ? ___res.order_date : '') + '</td>';
                output += '<td nowrap="nowrap">05: ' + (___res.payment.display_name) + '</td>';
                output += '<td nowrap="nowrap">06: ' + (___res.order_total.payment_fee) + '</td>';
                output += '<td nowrap="nowrap">07: ' + (___res.order_destinations[0].order_destination_total.shipping_fee) + '</td>';
                output += '<td nowrap="nowrap">08: ' + (___res.order_destinations[0].order_destination_total.wrapping_total) + '</td>';
                output += '<td nowrap="nowrap">09: ' + (___res.order_destinations[0].wrapping_type) + '</td>';
                output += '<td nowrap="nowrap">10: ' + (___res.order_destinations[0].message_card_name) + '</td>';
                output += '<td nowrap="nowrap">11: ' + (___res.order_destinations[0].message_card_message) + '</td>';
                output += '<td nowrap="nowrap">12: ' + (___res.order_destinations[0].memo) + '</td>';
                output += '<td nowrap="nowrap">13: ' + (___res.order_destinations[0].shipping_memo) + '</td>';
                output += '<td nowrap="nowrap">14: ' + (___res.order_destinations[0].noshi_memo) + '</td>';
                output += '<td nowrap="nowrap">15: ' + (___res.order_destinations[0].invoice) + '</td>';
                output += '<td nowrap="nowrap">16: ' + (___res.order_destinations[0].invoice_number) + '</td>';
                output += '<td nowrap="nowrap">17: ' + (___res.order_destinations[0].shipping_date ? ___res.order_destinations[0].shipping_date : '') + '</td>';
                output += '<td nowrap="nowrap">18: ' + (___res.order_destinations[0].preferred_delivery_date ? ___res.order_destinations[0].preferred_delivery_date : '') + '</td>';
                output += '<td nowrap="nowrap">19: ' + (___res.order_destinations[0].name) + '</td>';
                output += '<td nowrap="nowrap">20: ' + (___res.order_destinations[0].zipcode) + '</td>';
                output += '<td nowrap="nowrap">21: ' + (___res.order_total.total) + '</td>';
                output += '<td nowrap="nowrap">22: ' + (___res.returned_date ? ___res.returned_date : '') + '</td>';
                output += '<td nowrap="nowrap">23: ' + (___res.exchanged_date ? ___res.exchanged_date : '') + '</td>';
                output += '<td nowrap="nowrap">24: ' + (___res.order_status.status_name) + '</td>';
                output += '</tr>';
            });
            output += '</table>';
            output += '<script>console.timeEnd("renderList");</script>';
            output += '<script>console.timeEnd("requestCycle");</script>';
            output += '</div>';

            res.send(output);
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

app.listen(8000);
console.log('Listening on port 8000');
