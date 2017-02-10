
'user strict'

var React = require('react');
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import Lodash from 'lodash';

var TablePagination = React.createClass({
    getInitialState: function () {
        return {
            totalRowDisplay: 5,
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
        this.setState({ currentPage: page });
        this.props.onPagingHandler(page, this.state.totalRowDisplay);
    },
    generatePaging: function () {
        var totalPage = Math.ceil(this.props.data.length / this.state.totalRowDisplay);
        var buttons = [];
        if (totalPage > 1) {
            for (var i = 1; i < totalPage + 1; i++) {
                var bsStyle = i == this.props.currentPage ? 'primary' : 'default';
                buttons.push(<Button bsStyle={bsStyle} key={i} onClick={this.onPagingHandler.bind(null, i)}>{i}</Button>)
            }
        }
        return buttons;
    },
    selectedValueHandler: function (e) {
        this.setState({ totalRowDisplay: e.target.value});
        this.generatePaging();
        this.props.selectedValueHandler(e);
    },
    render: function () {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-6 col-sm-7"></div>
                    <div className="col-xs-6 col-sm-2 pull-right">
                        <select className="form-control"
                            onChange={this.selectedValueHandler}>
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select></div>
                    <div className="col-xs-6 col-sm-3 pull-right"><ButtonToolbar className="pull-right">
                        <ButtonGroup>
                            {this.generatePaging()}
                        </ButtonGroup>
                    </ButtonToolbar></div>
                </div>

            </div>
        )
    }
});

module.exports = TablePagination;