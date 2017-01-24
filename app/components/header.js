
'user strict'

var React = require('react');
var $ = require('jquery');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapJs from 'bootstrap/dist/js/bootstrap.js';

var HeaderLayout = React.createClass({
    render: function () {
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
                            <li className="active"><a href="#">Dashboard</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>)
    }
});

module.exports = HeaderLayout;