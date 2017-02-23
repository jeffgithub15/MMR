
'user strict'

import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button } from 'react-bootstrap';
import StatusDropdown from './statusdropdown.js';
import PriorityDropdown from './prioritydropdown';
import * as taskActions from '../actions/taskActions'
import TasksStore from '../stores/TasksStore'


export default class TaskAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onEditForm: false,
            name: '',
            description: '',
            priority: '1',
            status: 'To Do',
            showModal: false
        }
    }
    close() {
        this.setState({ showModal: false });
    }
    open() {
        this.setState({ showModal: true });
    }
    onSaveOrCancelFormHandler() {
        this.setState({ onEditForm: false });
        var task = {};
        task.name = this.state.name;
        task.description = this.state.description;
        task.priority = this.state.priority;
        task.status = this.state.status;
        taskActions.addTask(task);

        this.clearForm();
        this.close();
    }
    taskNameChangeHandler(e) {
        this.setState({ name: e.target.value });
    }
    taskDescriptionChangeHandler(e) {
        this.setState({ description: e.target.value });
    }
    priorityChangeHandler(e) {
        this.setState({ priority: e.target.value });
    }
    statusChangeHandler(e) {
        this.setState({ status: e.target.value });
    }
    clearForm(e) {
        this.setState({ description: '', name: '', priority: '1', status: 'To Do' });
    }
    render () {
        let style1 = 'btn-group', style2 = 'hidden';
        if (this.state.onEditForm) {
            style1 = 'hidden';
            style2 = 'btn-group';
        }
        return (
            <div>
                <a className={this.props.buttonStyle} onClick={this.open.bind(this)}>Add Task</a>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" value={this.state.name} placeholder="Name" onChange={this.taskNameChangeHandler.bind(this)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Description</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="3" value={this.state.description} placeholder="Description"
                                        onChange={this.taskDescriptionChangeHandler.bind(this)}></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Status</label>
                                <div className="col-sm-10">
                                    <StatusDropdown dropdownStyle="form-control"
                                        selectValue={this.state.status}
                                        selectedValueHandler={this.statusChangeHandler.bind(this)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Priority</label>
                                <div className="col-sm-10">
                                    <PriorityDropdown dropdownStyle="form-control"
                                        selectValue={this.state.priority}
                                        selectedValueHandler={this.priorityChangeHandler.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                        <Button bsStyle="primary" onClick={this.onSaveOrCancelFormHandler.bind(this)}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}