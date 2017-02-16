
import React, { Component } from 'react';
import * as StorageHelper from '../helpers/storagehelper';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export default class TaskActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onEditForm: false,
            task: this.props.task
        };
    }
    onEditFormHandler(task) {
        this.setState({ onEditForm: true });
        this.props.onEditHandler(task)
    }
    onDeleteFormHandler(task) {
        this.props.onDeleteHandler(task);
    }
    onSaveOrCancelFormHandler(task) {
        this.setState({ onEditForm: false });
        this.props.onSaveHandler(task)
    }
    render() {
        let style1 = 'btn-group', style2 = 'hidden';
        if (this.state.onEditForm) {
            style1 = 'hidden';
            style2 = 'btn-group';
        }
        return (
            <div>
                <div className={style1} role="group" aria-label="...">
                    <a href="#" onClick={() => { this.onEditFormHandler(this.state.task) } } className="btn btn-primary">
                        <span className="glyphicon glyphicon-pencil"></span></a>
                    <a href="#" onClick={() => { this.onDeleteFormHandler(this.state.task) } }
                        className="btn btn-danger"><span className="glyphicon glyphicon-trash"></span></a>
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
}