
'user strict'

var React = require('react');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


var JumbotronLayout = React.createClass({
    render: function () {
        return (
            <div className="jumbotron">
                <div className="container-fluid">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.label}</p>
                    <p><a href="#" className="btn btn-success btn-lg hide">Click Me</a></p>
                </div>
            </div>)
    }
});

module.exports = JumbotronLayout;