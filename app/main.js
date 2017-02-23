
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import * as StorageHelper from './helpers/storagehelper';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import TaskTable from './components/tasks';
import MMRApplication from './app.js';

class AboutApp extends React.Component
{
    render(){
         return (
            <div>
                About Page
            </div>
        );
    }
}

class ContactApp extends React.Component
{
    render(){
         return (
            <div>
                Contact Page
            </div>
        );
    }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={MMRApplication}>
      <Route path="tasks" component={TaskTable}/>
      <Route path="about" component={AboutApp}/>        
      <Route path="contact" component={ContactApp}/>
      <Route path="*" component={MMRApplication}/>
    </Route>
  </Router>
), document.getElementById('root'))


//StorageHelper.InitTaskData();