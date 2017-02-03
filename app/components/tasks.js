
'user strict'

var React = require('react');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TaskTableRow from './tasktablerow.js';
import TaskAddModal from './taskaddmodal.js';


var TaskTable = React.createClass({
    getInitialState: function () {
        return {
            tasks: JSON.parse(localStorage.getItem('tasks'))
        }
    },
    getTableHeader: function () {
        return (
            <tr className="info">
                <th>
                    Task Details
                        </th>
                <th>
                    Priority
                        </th>
                <th>
                    Status
                        </th>
                        <th></th>
            </tr>
        )
    },
    getTaskRows: function () {
        var rows = [];
        for (var i = 0; i < this.state.tasks.length; i++) {
            rows.push(<TaskTableRow key={this.state.tasks[i].id} task={this.state.tasks[i]}/>);
        }
        return rows;
    },
    onEditHandler: function(task){
        console.log('Editing ' + task.name);
    },
    render: function () {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">Task Master List</div>
                <div className="panel-body">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            {this.getTableHeader()}
                        </thead>
                        <tbody>
                            {this.getTaskRows()}
                        </tbody>
                    </table>
                    <TaskAddModal/>
                </div>
                
            </div>
        )
    }
});

module.exports = TaskTable;