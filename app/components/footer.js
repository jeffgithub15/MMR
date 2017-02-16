import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export default class FooterLayout extends React.Component {
    render() {
        return (
            <div className="row">
                <hr />
                <div className="col-xs-12">
                    <footer>
                        <p>{this.props.title}</p>
                    </footer>
                </div>
            </div>)
    }
};