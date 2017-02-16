import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
/*var $ = require('jquery');*/

import HeaderLayout from './components/header';
import JumbotronLayout from './components/jumbotron';
import SectionLayout from './components/section';
import FooterLayout from './components/footer';
import TaskTable from './components/tasks';


export default class MMRApplication extends React.Component{
    render () {
        return (
            <div>                
                <HeaderLayout page={this.props.location.pathname}/>
                <JumbotronLayout title="Magenic Masters React Js" label="" />
                <div className="container">
                    <div className="row">                        
                        {this.props.children}
                    </div>
                    <FooterLayout title="FOOTER MMR - Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                </div>
            </div>
        );
    }
};