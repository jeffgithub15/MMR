import React, { Component } from 'react';
import ConfigurationStore from '../stores/ConfigurationStore'

export default class ConfigurationPanel extends React.Component {
    constructor() {
        super();
    }
    getRows() {
        let rows = [];
        const configs = ConfigurationStore.getConfigurations();
        for (let i = 0; i < configs.length; i++) {
            rows.push(<tr key={configs[i].id}>
                <td>{configs[i].name}</td>
                <td>{configs[i].durationInMinutes}</td>
            </tr>);
        }
        return rows;
    }
    render() {
        return (
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            Name
                    </th>
                        <th>
                            Duration in Minutes
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        )
    }
};
