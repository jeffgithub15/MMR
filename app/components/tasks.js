
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
            currentSortName: { column: 'name', direction: 'asc' },
            totalRowDisplay: 3
        }
    },
    componentWillMount: function () {
        this.onPagingHandler(1, "name");
    },
    getTableHeader: function () {
        return (
            <tr className="info">
                <th>
                    <a className="btn" onClick={() => { this.onPagingHandler(this.state.currentPage, "name") } }>Task Details</a>
                </th>
                <th>
                    <a className="btn" onClick={() => { this.onPagingHandler(this.state.currentPage, "priority") } }>Priority</a>
                </th>
                <th>
                    <a className="btn" onClick={() => { this.onPagingHandler(this.state.currentPage, "status") } }>Status</a>
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
        this.onPagingHandler(this.state.currentPage);
    },
    onDeleteHandler: function (task) {
        StorageHelper.Delete(task);
        this.setState({ tasks: StorageHelper.GetTasks() });
    },
    onSelectedCurrentPage: function (page) {
        this.onPagingHandler(page, this.state.currentSortName);
        this.setState({ currentPage: page });
    },
    onSorting: function (sortName) {
        var datas = StorageHelper.GetTasks();
        var currentColumn = this.state.currentSortName;
        var columnToFind = (sortName == undefined ? this.state.currentSortName : sortName);
        if (sortName == this.state.currentSortName.column) {
            if (sortName != undefined) {
                currentColumn.direction = currentColumn.direction == "asc" ? "desc" : "asc";
            }
        }
        else {
            if (sortName != undefined) {
                currentColumn.column = sortName;
                currentColumn.direction = 'asc';
            }
        }

        if (sortName != undefined) {
            this.setState({ currentColumn: currentColumn });
        }
        var orderedTasks = Lodash.orderBy(datas, [currentColumn.column], [currentColumn.direction]);
        return orderedTasks;
    },
    onPagingHandler: function (page, sortName) {
        var filters = [];
        var sortedTasks = this.onSorting(sortName);
        var nextIndex = (page - 1) * this.state.totalRowDisplay;
        for (var i = 0; i < this.state.totalRowDisplay; i++) {
            if (sortedTasks[nextIndex] != undefined) {
                filters.push(sortedTasks[nextIndex]);
                nextIndex += 1;
            }
        }
        this.setState({ filteredTasks: filters, currentPage: page });
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
                    <TablePagination totalRowDisplay="3" data={this.state.tasks} currentPage={this.state.currentPage}
                        onPagingHandler={this.onPagingHandler} />
                    <TaskAddModal onSaveHandler={this.onSaveHandler} />
                </div>
            </div>
        )
    }
});


module.exports = TaskTable;