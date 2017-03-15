import React, { Component } from 'react';
import PriorityStore from '../stores/PriorityStore'
import TasksStore from '../stores/TasksStore'

export default class TaskDropdown extends React.Component {
    constructor(props){
        super(props);
    }
    selectedValueHandler(e) {
        const task = TasksStore.getTaskById(e.target.value);
        this.props.selectedValueHandler(task);
    }
    getPriorityDropdown() {
        const tasks = PriorityStore.getHighPriorities();
        console.log(tasks);
        let rows = [];
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
