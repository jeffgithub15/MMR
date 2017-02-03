
'user strict'

var React = require('react');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import StatusDropdown from './statusdropdown.js';
import PriorityDropdown from './prioritydropdown';

var TaskAddModal = React.createClass({
    getInitialState: function () {
        return {
            onEditForm: false,
            task: this.props.task
        }
    },
    render: function () {
        var style1 = 'btn-group', style2 = 'hidden';
        if (this.state.onEditForm) {
            style1 = 'hidden';
            style2 = 'btn-group';
        }
        return (
            <div>
                <div className="modal fade" id="AddNewTaskModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Add New Task</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-horizontal">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Description</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" rows="3" placeholder="Description"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Status</label>
                                        <div className="col-sm-10">
                                            <StatusDropdown dropdownStyle="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Priority</label>
                                        <div className="col-sm-10">
                                            <PriorityDropdown dropdownStyle="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" data-toggle="modal" data-target="#AddNewTaskModal">Add New</button>
            </div>
        )
    }
});

module.exports = TaskAddModal;