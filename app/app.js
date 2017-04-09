import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import HeaderLayout from './components/header';
import JumbotronLayout from './components/jumbotron';
import SectionLayout from './components/section';
import FooterLayout from './components/footer';
import TaskTable from './components/tasks';
import PomodoroTimer from './components/PomodoroTimer';

export default class MMRApplication extends React.Component {
    render() {
        return (
            <div>
                <HeaderLayout page={this.props.location.pathname} />
                <JumbotronLayout title="Magenic Masters React Js - Final Project" label="" />
                <div className="container-table">
                    <div className="row">
                        <div className="col-md-5"><PomodoroTimer /></div>
                        <div className="col-md-7"> {this.props.children}</div>
                    </div>
                    <FooterLayout title="FOOTER MMR - Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                </div>
            </div>
        );
    }
};