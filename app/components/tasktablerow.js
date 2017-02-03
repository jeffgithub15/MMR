
'user strict'

var React = require('react');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TaskActionButton from './taskactionbutton.js';
import StatusDropdown from './statusdropdown.js';
import PriorityDropdown from './prioritydropdown';


var TaskTableRow = React.createClass({
    getInitialState: function () {
        return {
            task: this.props.task,
            onEditForm: false
        }
    },
    getPriorityName: function (priority) {
        //TODO: doesn't know the value for 1,2,3
        if (priority == 1)
            return "Medium";
        return 'High'
    },    
    onEditHandler: function (task) {
        console.log('Editing ' + task.name);
        this.setState({ onEditForm: true });
    },
    onSaveOrCancelFormHandler: function (task) {
        console.log('Saving or Cancelling ' + task.name);
        this.setState({ onEditForm: false });
    },
    render: function () {
        var style1 = 'form-control', style2 = 'hidden';
        if (!this.state.onEditForm) {
            style1 = 'hidden';
            style2 = '';
        }
        return (
            <tr>
                <td className="col-md-6"><input className={style1} type="text" value={this.state.task.name} onChange={function () { } } />
                    <span className={style2}>{this.state.task.name}</span>

                    <textarea className={style1} type="text" value={this.state.task.description} onChange={function () { } } />
                    <h5 className="td-sub-label"><span className={style2}>{this.state.task.description}</span></h5></td>

                <td className="col-md-2"><PriorityDropdown dropdownStyle={style1}/>
                    <span className={style2}>{this.getPriorityName(this.state.task.priority)}</span></td>

                <td className="col-md-2"><StatusDropdown dropdownStyle={style1}/>
                    <span className={style2}>{this.state.task.status}</span></td>

                <td className="col-md-2"><TaskActionButton task={this.state.task} onEditHandler={this.onEditHandler}
                    onSaveOrCancelFormHandler={this.onSaveOrCancelFormHandler} /></td>
            </tr>
        )
    }
});

module.exports = TaskTableRow;