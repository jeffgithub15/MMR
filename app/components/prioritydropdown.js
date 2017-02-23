import React, { Component } from 'react';

export default class PriorityDropdown extends React.Component{
    selectedValueHandler(e) {
        this.props.selectedValueHandler(e);
    }
    getPriorityDropdown(style) {
        return (<select className={style}
            onChange={this.selectedValueHandler.bind(this)}
            value={this.props.selectValue} >        
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
        </select>);
    }
    render() {
        return (
            this.getPriorityDropdown(this.props.dropdownStyle)
        )
    }
};
