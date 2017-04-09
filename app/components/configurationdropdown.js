import React, { Component } from 'react';
import ConfigurationStore from '../stores/ConfigurationStore'

export default class ConfigurationDropdown extends React.Component {
    constructor(props){
        super(props);
    }
    selectedValueHandler(e) {
        this.props.selectedValueHandler(e);
    }
    getConfigurationDropdown() {
        const configs = ConfigurationStore.getConfigurations();
        let rows = [];
        for (var i = 0; i < configs.length; i++) {
            rows.push(<option key={configs[i].id} value={configs[i].id}>{configs[i].name}</option>);
        }
        return rows;
    }
    render() {
        let styles = this.props.dropdownStyle;
        return (
            <select className={styles}
                onChange={this.selectedValueHandler.bind(this)}
                value={this.props.selectValue} >
                {this.getConfigurationDropdown()}}
            </select>
        )
    }
};
