
'user strict'

var React = require('react');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button } from 'react-bootstrap';
import StatusDropdown from './statusdropdown.js';
import PriorityDropdown from './prioritydropdown';

var TaskAddModal = React.createClass({
    getInitialState: function () {
        return {
            onEditForm: false,
            name: '',
            description: '',
            priority: '-1',
            status: '-1',
            showModal: false
        }
    },
    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },
    onSaveOrCancelFormHandler: function () {
        this.setState({ onEditForm: false });
        var task = {};
        task.name = this.state.name;
        task.description = this.state.description;
        task.priority = this.state.priority;
        task.status = this.state.status;
        this.props.onSaveHandler(task);
        this.clearForm();
        this.close();
    },
    taskNameChangeHandler: function (e) {
        this.setState({ name: e.target.value });
    },
    taskDescriptionChangeHandler: function (e) {
        this.setState({ description: e.target.value });
    },
    priorityChangeHandler: function (e) {
        this.setState({ priority: e.target.value });
    },
    statusChangeHandler: function (e) {
        this.setState({ status: e.target.value });
    },
    clearForm: function (e) {
        this.setState({ description: '', name: '', priority: '-- Select --', status: '-- Select --' });
    },
    render: function () {
        var style1 = 'btn-group', style2 = 'hidden';
        if (this.state.onEditForm) {
            style1 = 'hidden';
            style2 = 'btn-group';
        }
        return (
            <div>
                <Button bsStyle="primary" onClick={this.open}>Add New</Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" value={this.state.name} placeholder="Name" onChange={this.taskNameChangeHandler} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Description</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="3" value={this.state.description} placeholder="Description"
                                        onChange={this.taskDescriptionChangeHandler}></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Status</label>
                                <div className="col-sm-10">
                                    <StatusDropdown dropdownStyle="form-control"
                                        selectValue={this.state.status}
                                        selectedValueHandler={this.statusChangeHandler} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Priority</label>
                                <div className="col-sm-10">
                                    <PriorityDropdown dropdownStyle="form-control"
                                        selectValue={this.state.priority}
                                        selectedValueHandler={this.priorityChangeHandler} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button bsStyle="primary" onClick={this.onSaveOrCancelFormHandler}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
});

module.exports = TaskAddModal;