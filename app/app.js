'user strict'
/*
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
*/
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapJs from 'bootstrap/dist/js/bootstrap.js';


var KanbanApplication = React.createClass({
    render: function () {
        var elapsed = Math.round(this.props.elapsed / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0');
        var message = 'Hello World! React has been successfully running for ' + seconds + ' seconds.';

        return (
            <div>
                <p>{message}</p>
            </div>)
    }
});

var start = new Date().getTime();
setInterval(function () {
    ReactDOM.render(
        <KanbanApplication elapsed={new Date().getTime() - start} />,
        document.getElementById('root')
    );
}, 50);

