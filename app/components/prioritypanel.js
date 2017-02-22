
import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TasksStore from '../stores/TasksStore'
import PriorityStore from '../stores/PriorityStore'



export default class PriorityPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priorities: PriorityStore.getHighPriorities()
        };
    }
    componentWillMount() {
        TasksStore.on('change', this.refreshList.bind(this));
    }
    refreshList() {
        this.setState({ priorities: PriorityStore.getHighPriorities() });
    }
    getPriorities() {
        console.log('PriorityPanel getPriorities');
        let rows = [];
        for (let i = 0; i < this.state.priorities.length; i++) {
            rows.push(<li key={i}><a href="#">{this.state.priorities[i].name}</a></li>);
        }
        return rows;
    }
    render() {

        return (
            <ul className={this.props.styleName}>
                {this.getPriorities()}
            </ul>)
    }
};