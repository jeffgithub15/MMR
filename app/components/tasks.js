
'user strict'

var React = require('react');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


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
            </tr>
        )
    },
    getRow: function (task) {
        return (
            <tr key={task.id}>
                <td>{task.name}<h5><span className="td-sub-label">{task.description}</span></h5></td>
                <td>{this.getPriorityName(task.priority)}</td>
                <td>{task.status}</td>
            </tr>
        )
    },
    getTaskRows: function () {
        var rows = [];
        for (var i = 0; i < this.state.tasks.length; i++) {
            rows.push(this.getRow(this.state.tasks[i]));
        }
        return rows;
    },
    getPriorityName: function(priority){
        //TODO: doesn't know the value for 1,2,3
        if(priority == 1)
            return "Medium";
        return 'High'
    },
    render: function () {
        return (
            <div>
                <h3>Tasks Masterlist</h3>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        {this.getTableHeader()}
                    </thead>
                    <tbody>
                        {this.getTaskRows()}
                    </tbody>
                </table>
            </div>
        )
    }
});

module.exports = TaskTable;