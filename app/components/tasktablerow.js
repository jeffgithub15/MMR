
'user strict'

var React = require('react');
var StorageHelper = require('./../helpers/storagehelper');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TaskActionButton from './taskactionbutton.js';
import StatusDropdown from './statusdropdown.js';
import PriorityDropdown from './prioritydropdown';


var TaskTableRow = React.createClass({
    getInitialState: function () {
        return {
            task: this.props.task,
            onEditForm: false,
            name: this.props.task.name,
            description: this.props.task.description,
            priority: this.props.task.priority,
            status: this.props.task.status
        }
    },
    getPriorityName: function (priority) {
        if (priority == 1)
            return "Low";
        else if (priority == 2)
            return "Medium";
        else if (priority == 3)
            return "High";
        return priority;
    },
    onEditHandler: function (task) {
        this.setState({ onEditForm: true });
    },
    onSaveOrCancelFormHandler: function (task) {
        this.setState({ onEditForm: false });
        task.name = this.state.name;
        task.description = this.state.description;
        task.priority = this.state.priority;
        task.status = this.state.status;
        this.props.onSaveHandler(task);
    },
    onDeleteFormHandler: function (task) {
        if (confirm('Delete task "' + task.name + '"?'))
            this.props.onDeleteHandler(task);
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
    render: function () {
        var style1 = 'form-control', style2 = 'hidden';
        if (!this.state.onEditForm) {
            style1 = 'hidden';
            style2 = '';
        }
        return (
            <tr>
                <td className="col-md-6"><input className={style1} type="text" value={this.state.name} onChange={this.taskNameChangeHandler} />
                    <span className={style2}>{this.state.task.name}</span>

                    <textarea className={style1} type="text" value={this.state.description} onChange={this.taskDescriptionChangeHandler} />
                    <h5 className="td-sub-label"><span className={style2}>{this.state.task.description}</span></h5></td>

                <td className="col-md-2"><PriorityDropdown dropdownStyle={style1} selectValue={this.state.priority} selectedValueHandler={this.priorityChangeHandler} />
                    <span className={style2}>{this.getPriorityName(this.state.task.priority)}</span></td>

                <td className="col-md-2"><StatusDropdown dropdownStyle={style1} selectValue={this.state.status} selectedValueHandler={this.statusChangeHandler} />
                    <span className={style2}>{this.state.task.status}</span></td>

                <td className="col-md-2"><TaskActionButton task={this.state.task} onEditHandler={this.onEditHandler}
                    onDeleteHandler={this.onDeleteFormHandler} onSaveHandler={this.onSaveOrCancelFormHandler} /></td>
            </tr>
        )
    }
});

module.exports = TaskTableRow;