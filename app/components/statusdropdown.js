
'user strict'

var React = require('react');

var StatusDropdown = React.createClass({
    selectedValueHandler: function (e) {
        this.props.selectedValueHandler(e);
    },
    getStatusDropdown: function (style) {
        return (<select className={style}
            onChange={this.selectedValueHandler}
            value={this.props.selectValue}>
            <option value="-1">-- Select --</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
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