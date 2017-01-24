
'user strict'

var React = require('react');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

var FooterLayout = React.createClass({
    render: function () {
        return (
            <div className="row">
                <hr/>
                <div className="col-xs-12">
                    <footer>
                        <p>{this.props.title}</p>
                    </footer>
                </div>
            </div>)
    }
});

module.exports = FooterLayout;