'user strict'

var React = require('react');
var ReactDOM = require('react-dom');

import HeaderLayout from './components/header';
import JumbotronLayout from './components/jumbotron';
import SectionLayout from './components/section';
import FooterLayout from './components/footer';
import TaskTable from './components/tasks';


var MMRApplication = React.createClass({
    render: function () {
        return (
            <div>                
                <HeaderLayout page={this.props.location.pathname}/>
                <JumbotronLayout title="Magenic Masters React Js" label="Bootstrap Bootstrap Bootstrap Bootstrap" />
                <div className="container-fluid">
                    <div className="row">                        
                        {this.props.children}
                    </div>
                    <FooterLayout title="FOOTER MMR - Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                </div>
            </div>
        );
    }
});

var tasks = [ 
    { id: 1, name: 'Finish Week 1 Deck', description: 'Introduction, React Component, JSX, Virtual DOM', priority: '1', status: 'Done' },
    { id: 2, name: 'Finish Week 1 Quiz', description: 'Introduction to MMR', priority: '2', status: 'Done' },
    { id: 3, name: 'Finish Week 3 Deck', description: 'Props and State', priority: '3', status: 'Done' }];

localStorage.setItem("tasks", JSON.stringify(tasks));


module.exports = MMRApplication;