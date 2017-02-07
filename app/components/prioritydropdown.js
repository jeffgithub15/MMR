
'user strict'

var React = require('react');

var PriorityDropdown = React.createClass({
    selectedValueHandler: function (e) {
        this.props.selectedValueHandler(e);
    },
    getPriorityDropdown: function (style) {
        return (<select className={style}
            onChange={this.selectedValueHandler}
            value={this.props.selectValue} >            
            <option value="-1">-- Select --</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
        </select>);
    },
    render: function () {
        return (
            this.getPriorityDropdown(this.props.dropdownStyle)
        )
    }
});

module.exports = PriorityDropdown;