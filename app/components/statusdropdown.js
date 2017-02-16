import React, { Component } from 'react';

export default class StatusDropdown extends React.Component {
    selectedValueHandler(e) {
        this.props.selectedValueHandler(e);
    }
    getStatusDropdown(style) {
        return (<select className={style}
            onChange={this.selectedValueHandler.bind(this)}
            value={this.props.selectValue}>
            <option value="-1">-- Select --</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        </select>);
    }
    render() {
        return (
            this.getStatusDropdown(this.props.dropdownStyle)
        )
    }
};