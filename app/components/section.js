import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export default class SeactionLayout extends React.Component{
    render() {
        return (
            <div className="section-border">
                <h2>{this.props.title}</h2>
                <p>{this.props.label}</p>
                 {this.props.showButton ? <p><a href="#" className="btn btn-success">More</a></p> : ''}
            </div>
        )
    }
};