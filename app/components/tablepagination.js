
'user strict'

var React = require('react');
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import Lodash from 'lodash';

var TablePagination = React.createClass({
    getInitialState: function () {
        return {
            totalRowDisplay: this.props.totalRowDisplay,
            filteredData: [], 
            currentPage: 1
        }
    },
    onPagingHandler: function (page) {        
        var filters = [];
        /*
        var datas = this.props.data;
        var nextIndex = (page - 1) * this.state.totalRowDisplay;
        for (var i = 0; i < this.state.totalRowDisplay; i++) {
            if (datas[nextIndex] != undefined) {
                filters.push(datas[nextIndex]);
                nextIndex += 1;
            }
        }*/
        this.props.onPagingHandler(page);
    },
    generatePaging: function () {
        var totalPage = Math.ceil(this.props.data.length / this.props.totalRowDisplay);
        var buttons = [];
        for (var i = 1; i < totalPage + 1; i++) {
            buttons.push(<Button key={i} onClick={this.onPagingHandler.bind(null, i)}>{i}</Button>)
        }
        return buttons;
    },
    render: function () {
        return (
            <ButtonToolbar className="pull-right">
                <ButtonGroup>
                    {this.generatePaging()}
                </ButtonGroup>
            </ButtonToolbar>
        )
    }
});

module.exports = TablePagination;