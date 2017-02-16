
import React, { Component } from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import Lodash from 'lodash';

export default class TablePagination extends React.Component {
    constructor() {
        super();
        this.state = {
            totalRowDisplay: 5,
            filteredData: [],
            currentPage: 1
        };
    }
    componentWillMount() {
    }
    onPagingHandler(page) {
        this.setState({ currentPage: page });
        this.props.onPagingHandler(page, this.state.totalRowDisplay);
    }
    generatePaging() {
        const totalPage = Math.ceil(this.props.data.length / this.state.totalRowDisplay);
        let buttons = [];
        if (totalPage > 1) {
            for (var i = 1; i < totalPage + 1; i++) {
                var bsStyle = i == this.props.currentPage ? 'primary' : 'default';
                buttons.push(<Button bsStyle={bsStyle} key={i} onClick={this.onPagingHandler.bind(this, i)}>{i}</Button>)
            }
        }
        return buttons;
    }
    selectedValueHandler(e) {
        this.setState({ totalRowDisplay: e.target.value });
        this.generatePaging();
        this.props.selectedValueHandler(e);
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-6 col-sm-7"></div>
                    <div className="col-xs-6 col-sm-2 pull-right">
                        <select className="form-control"
                            onChange={this.selectedValueHandler.bind(this)}>
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

            </div>)
    }
}