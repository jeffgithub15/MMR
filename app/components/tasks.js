
import React, { Component } from 'react';
import * as StorageHelper from '../helpers/storagehelper';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TaskTableRow from './tasktablerow.js';
import TaskAddModal from './taskaddmodal.js';
import TablePagination from './tablepagination';
import Lodash from 'lodash';
import Dispatcher from '../dispatcher'
import * as taskActions from '../actions/taskActions'
import TasksStore from '../stores/TasksStore'


export default class TaskTable extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: TasksStore.getTasks(),
            filteredTasks: [],
            currentPage: 1,
            currentSortName: { column: 'name', direction: '' },
            totalRowDisplay: 5
        };
    }
    componentWillMount() {
        this.onPagingHandler(1, this.state.totalRowDisplay);
        TasksStore.on('change', this.refreshTaskList.bind(this));
    }
    refreshTaskList() {
        this.setState({ tasks: TasksStore.getTasks() });
        this.onPagingHandler(this.state.currentPage, this.state.totalRowDisplay);
    }
    getTableHeader() {
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
    }
    getTaskRows() {
        let rows = [];
        for (var i = 0; i < this.state.filteredTasks.length; i++) {
            rows.push(<TaskTableRow key={this.state.filteredTasks[i].id} className="pull-right"
                task={this.state.filteredTasks[i]}
                onSaveHandler={this.onEditHandler.bind(this)}
                onDeleteHandler={this.onDeleteHandler.bind(this)} />);
        }
        return rows;
    }
    onSaveHandler(task) {
        taskActions.addTask(task);
    }
    onEditHandler(task) {
        taskActions.editTask(task);
    }
    onDeleteHandler(task) {
        taskActions.deleteTask(task);
    }
    onSelectedCurrentPage(page) {
        this.onPagingHandler(page, this.state.totalRowDisplay, this.state.currentSortName);
        this.setState({ currentPage: page });
    }
    onSorting(sortName) {
        var datas = TasksStore.getTasks();
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
    }
    onPagingHandler(page, rowsToDisplay, sortName) {
        let filters = [];
        const sortedTasks = this.onSorting(sortName);
        let nextIndex = (page - 1) * rowsToDisplay;
        for (var i = 0; i < rowsToDisplay; i++) {
            if (sortedTasks[nextIndex] != undefined) {
                filters.push(sortedTasks[nextIndex]);
                nextIndex += 1;
            }
        }
        this.setState({ filteredTasks: filters, currentPage: page });

        const datas = TasksStore.getTasks();
        if (filters.length == 0 && datas.length > 0) {
            this.onPagingHandler(page - 1, rowsToDisplay, sortName);
        }
    }
    selectedValueHandler(e) {
        this.setState({ totalRowDisplay: e.target.value });
        this.onPagingHandler(this.state.currentPage, e.target.value)
    }
    render() {
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
                        onPagingHandler={this.onPagingHandler.bind(this)}
                        selectedValueHandler={this.selectedValueHandler.bind(this)} />
                    <TaskAddModal onSaveHandler={this.onSaveHandler.bind(this)} />
                </div>
            </div>
        )
    }
}
