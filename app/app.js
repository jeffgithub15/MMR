'user strict'
/*
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
*/

var React = require('react');
var ReactDOM = require('react-dom');

import HeaderLayout from './components/header';
import JumbotronLayout from './components/jumbotron';
import SectionLayout from './components/section';
import FooterLayout from './components/footer';


var MMRApplication = React.createClass({
    render: function () {
        return (
            <div>
                <HeaderLayout />
                <JumbotronLayout title="Magenic Masters React Js" label="Bootstrap Bootstrap Bootstrap Bootstrap"/>
                <div className="container-fluid">
                    <div className="row">
                        <SectionLayout title="HTML" label="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
                        <SectionLayout title="CSS" label="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
                        <SectionLayout title="JS" showButton="true" label="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
                    </div>
                    <FooterLayout title="FOOTER MMR - Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <MMRApplication />,
    document.getElementById('root')
);