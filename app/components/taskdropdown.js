import React, { Component } from 'react';
import PriorityStore from '../stores/PriorityStore'
import TasksStore from '../stores/TasksStore'

export default class TaskDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    selectedValueHandler(e) {
        const task = TasksStore.getTaskById(e.target.value);
        this.props.selectedValueHandler(task);
    }
    componentWillMount() {
        TasksStore.on('change', this.getPriorityDropdown.bind(this));
    }
    getPriorityDropdown() {
        const tasks = PriorityStore.getOpenTask();
        let rows = [];
        rows.push(<option key={0} value={0}>Select Task</option>);
        for (var i = 0; i < tasks.length; i++) {
            rows.push(<option key={tasks[i].id} value={tasks[i].id}>{tasks[i].name}</option>);
        }
        return rows;
    }
    render() {
        return (
            <select className="form-control"
                onChange={this.selectedValueHandler.bind(this)}
                value={this.props.selectValue} >
                {this.getPriorityDropdown()}}
            </select>
        )
    }
};
