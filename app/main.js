'user strict'

var React = require('react');
var ReactDOM = require('react-dom');
var StorageHelper = require('./helpers/storagehelper');

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import TaskTable from './components/tasks';
import MMRApplication from './app.js';

var AboutApp = React.createClass({
    render: function () {
        return (
            <div>
                About Page
            </div>
        );
    }
});

var ContactApp = React.createClass({
    render: function () {
        return (
            <div>
                Contact Page
            </div>
        );
    }
});

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


StorageHelper.InitTaskData();