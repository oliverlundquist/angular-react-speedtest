var Table = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentDidMount: function () {
        $.get('/orders', function(result) {
            if (this.isMounted()) this.setState({ data: result });
        }.bind(this));
    },
    render: function () {
        var self = this;
        var orders = this.state.data;

        var body = orders.map(function (order, _index) {
            return React.DOM.tr({ key: _index }, [
                        React.DOM.td({ key: _index + '01' + order.colorme_id }, '01: ' + order.customer.email),
                        React.DOM.td({ key: _index + '02' + order.colorme_id }, '02: ' + order.colorme_id),
                        React.DOM.td({ key: _index + '03' + order.colorme_id }, '03: ' + order.customer.name),
                        React.DOM.td({ key: _index + '04' + order.colorme_id }, '04: '), //order.order_date),
                        React.DOM.td({ key: _index + '05' + order.colorme_id }, '05: '), //order.payment.display_name),
                        React.DOM.td({ key: _index + '06' + order.colorme_id }, '06: '), //order.order_total.payment_fee),
                        React.DOM.td({ key: _index + '07' + order.colorme_id }, '07: '), //order.order_destinations[0].order_destination_total.shipping_fee),
                        React.DOM.td({ key: _index + '08' + order.colorme_id }, '08: '), //order.order_destinations[0].order_destination_total.wrapping_total),
                        React.DOM.td({ key: _index + '09' + order.colorme_id }, '09: '), //order.order_destinations[0].wrapping_type),
                        React.DOM.td({ key: _index + '10' + order.colorme_id }, '10: '), //order.order_destinations[0].message_card_name),
                        React.DOM.td({ key: _index + '11' + order.colorme_id }, '11: '), //order.order_destinations[0].message_card_message),
                        React.DOM.td({ key: _index + '12' + order.colorme_id }, '12: '), //order.order_destinations[0].memo),
                        React.DOM.td({ key: _index + '13' + order.colorme_id }, '13: '), //order.order_destinations[0].shipping_memo),
                        React.DOM.td({ key: _index + '14' + order.colorme_id }, '14: '), //order.order_destinations[0].noshi_memo),
                        React.DOM.td({ key: _index + '15' + order.colorme_id }, '15: '), //order.order_destinations[0].invoice),
                        React.DOM.td({ key: _index + '16' + order.colorme_id }, '16: '), //order.order_destinations[0].invoice_number),
                        React.DOM.td({ key: _index + '17' + order.colorme_id }, '17: '), //order.order_destinations[0].shipping_date),
                        React.DOM.td({ key: _index + '18' + order.colorme_id }, '18: '), //order.order_destinations[0].preferred_delivery_date),
                        React.DOM.td({ key: _index + '19' + order.colorme_id }, '19: '), //order.order_destinations[0].name),
                        React.DOM.td({ key: _index + '20' + order.colorme_id }, '20: '), //order.order_destinations[0].zipcode),
                        React.DOM.td({ key: _index + '21' + order.colorme_id }, '21: '), //order.order_total.total),
                        React.DOM.td({ key: _index + '22' + order.colorme_id }, '22: '), //order.returned_date),
                        React.DOM.td({ key: _index + '23' + order.colorme_id }, '23: '), //order.exchanged_date),
                        React.DOM.td({ key: _index + '24' + order.colorme_id }, '24: '), //order.order_status.status_name)
                    ]
            );
        });

        var table = React.DOM.table({ className: 'tableBorder' }, body);

        return table
    }
});

var TableInstance = React.render(
<Table />,
document.getElementById('reactContainer')
);

// TableInstance.setState(function (state) {
//  state.data = ['row4', 'row5'];
// });
