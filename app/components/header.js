
import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapJs from 'bootstrap/dist/js/bootstrap.js';

export default class HeaderLayout extends React.Component{
    getActiveClass(page) {
        return page === this.props.page ? "active" : '';
    }
    render() {
        return (
            <nav className="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">

                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">MMR</a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="nav navbar-nav">
                            <li className={this.getActiveClass('/tasks')}><a href="tasks">Tasks</a></li>
                            <li className={this.getActiveClass('/about')}><a href="about">About</a></li>
                            <li className={this.getActiveClass('/contact')}><a href="contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>)
    }
};
