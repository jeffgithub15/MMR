
'user strict'

var React = require('react');

var StatusDropdown = React.createClass({
    getStatusDropdown: function (style) {
        return (<select className={style}>
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
        </select>);
    },
    render: function () {
        return (
            this.getStatusDropdown(this.props.dropdownStyle)
        )
    }
});

module.exports = StatusDropdown;