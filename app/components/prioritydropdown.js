
'user strict'

var React = require('react');

var PriorityDropdown = React.createClass({
    getPriorityDropdown: function (style) {
        return (<select className={style}>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>);
    },
    render: function () {
        return (
            this.getPriorityDropdown(this.props.dropdownStyle)
        )
    }
});

module.exports = PriorityDropdown;