
'user strict'

var React = require('react');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


var SeactionLayout = React.createClass({
    render: function () {
        return (
            <div className="section-border">
                <h2>{this.props.title}</h2>
                <p>{this.props.label}</p>
                 {this.props.showButton ? <p><a href="#" className="btn btn-success">More</a></p> : ''}
            </div>
        )
    }
});

module.exports = SeactionLayout;