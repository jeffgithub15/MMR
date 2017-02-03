
'user strict'

var React = require('react');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


var TaskActionButton = React.createClass({
    getInitialState: function () {
        return {
            onEditForm: false,
            task: this.props.task
        }
    },
    onEditFormHandler: function (task) {
        //onClick={()=>{this.props.onEditHandler(this.state.task)}} 
        this.setState({ onEditForm: true });
        this.props.onEditHandler(task)

    },
    onSaveOrCancelFormHandler: function (task) {
        this.setState({ onEditForm: false });
        this.props.onSaveOrCancelFormHandler(task)
    },
    componentDidUpdate: function () {

    },
    render: function () {
        var style1 = 'btn-group', style2 = 'hidden';
        if (this.state.onEditForm) {
            style1 = 'hidden';
            style2 = 'btn-group';
        }
        return (
            <div>
                <div className={style1} role="group" aria-label="...">
                    <a href="#" onClick={() => { this.onEditFormHandler(this.state.task) } } className="btn btn-primary">
                        <span className="glyphicon glyphicon-pencil"></span></a>
                    <a href="#" className="btn btn-danger"><span className="glyphicon glyphicon-trash"></span></a>
                </div>
                <div className={style2} role="group" aria-label="...">
                    <a href="#" onClick={() => { this.onSaveOrCancelFormHandler(this.state.task) } } className="btn btn-success">
                        <span className="glyphicon glyphicon-floppy-disk"></span></a>
                    <a href="#" onClick={() => { this.onSaveOrCancelFormHandler(this.state.task) } } className="btn btn-danger">
                        <span className="glyphicon glyphicon-remove"></span></a>
                </div>
            </div>
        )
    }
});

module.exports = TaskActionButton;