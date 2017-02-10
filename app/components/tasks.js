
'user strict'

var React = require('react');
var StorageHelper = require('./../helpers/storagehelper');

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TaskTableRow from './tasktablerow.js';
import TaskAddModal from './taskaddmodal.js';
import TablePagination from './tablepagination';
import Lodash from 'lodash';

var TaskTable = React.createClass({
    getInitialState: function () {
        return {
            tasks: StorageHelper.GetTasks(),
            filteredTasks: [],
            currentPage: 1,
            currentSortName: { column: 'name', direction: '' },
            totalRowDisplay: 5
        }
    },
    componentWillMount: function () {
        this.onPagingHandler(1, this.state.totalRowDisplay);
    },
    getTableHeader: function () {
        return (
            <tr className="info">
                <th>
                    <a className="btn" onClick={() => { this.onPagingHandler(this.state.currentPage, this.state.totalRowDisplay, "name") } }>Task Details</a>
                </th>
                <th>
                    <a className="btn" onClick={() => { this.onPagingHandler(this.state.currentPage, this.state.totalRowDisplay, "priority") } }>Priority</a>
                </th>
                <th>
                    <a className="btn" onClick={() => { this.onPagingHandler(this.state.currentPage, this.state.totalRowDisplay, "status") } }>Status</a>
                </th>
                <th></th>
            </tr>
        )
    },
    getTaskRows: function () {
        var rows = [];
        for (var i = 0; i < this.state.filteredTasks.length; i++) {
            rows.push(<TaskTableRow key={this.state.filteredTasks[i].id} className="pull-right"
                task={this.state.filteredTasks[i]}
                onSaveHandler={this.onSaveHandler}
                onDeleteHandler={this.onDeleteHandler} />);
        }
        return rows;
    },
    onEditHandler: function (task) {

    },
    onSaveHandler: function (task) {
        StorageHelper.Save(task);
        this.setState({ tasks: StorageHelper.GetTasks() });
        this.onPagingHandler(this.state.currentPage, this.state.totalRowDisplay);
    },
    onDeleteHandler: function (task) {
        StorageHelper.Delete(task);
        this.setState({ tasks: StorageHelper.GetTasks() });
        this.onPagingHandler(this.state.currentPage, this.state.totalRowDisplay);
    },
    onSelectedCurrentPage: function (page) {
        this.onPagingHandler(page, this.state.totalRowDisplay, this.state.currentSortName);
        this.setState({ currentPage: page });
    },
    onSorting: function (sortName) {
        var datas = StorageHelper.GetTasks();
        var currentColumn = this.state.currentSortName;
        var columnToFind = (sortName == undefined ? this.state.currentSortName : sortName);

        if (sortName != undefined && sortName != this.state.currentSortName.column) {
            currentColumn.column = sortName;
            currentColumn.direction = "";
        }
        if (sortName != undefined) {
            currentColumn.direction = currentColumn.direction == "asc" ? "desc" : "asc";
            this.setState({ currentColumn: currentColumn });
        }
        var orderedTasks = Lodash.orderBy(datas, [currentColumn.column], [currentColumn.direction]);
        return orderedTasks;
    },
    onPagingHandler: function (page, rowsToDisplay, sortName) {
        var filters = [];
        var sortedTasks = this.onSorting(sortName);
        var nextIndex = (page - 1) * rowsToDisplay;
        for (var i = 0; i < rowsToDisplay; i++) {
            if (sortedTasks[nextIndex] != undefined) {
                filters.push(sortedTasks[nextIndex]);
                nextIndex += 1;
            }
        }
        this.setState({ filteredTasks: filters, currentPage: page });

        var datas = StorageHelper.GetTasks();
        if (filters.length == 0 && datas.length > 0) {
            this.onPagingHandler(page - 1, rowsToDisplay, sortName);
        }
    },
    selectedValueHandler: function (e) {
         this.setState({ totalRowDisplay: e.target.value});
        this.onPagingHandler(this.state.currentPage, e.target.value)
    },
    render: function () {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">Task Master List</div>
                <div className="panel-body ">
                    <div className="task-min-height-panel">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                {this.getTableHeader()}
                            </thead>
                            <tbody>
                                {this.getTaskRows()}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination
                        data={this.state.tasks}
                        currentPage={this.state.currentPage}
                        onPagingHandler={this.onPagingHandler}
                        selectedValueHandler = {this.selectedValueHandler} />
                    <TaskAddModal onSaveHandler={this.onSaveHandler} />
                </div>
            </div>
        )
    }
});


module.exports = TaskTable;