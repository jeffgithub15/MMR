
import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TaskTable from './tasks';
import TaskDropdown from './taskdropdown';
import TasksStore from '../stores/TasksStore'

export default class PomodoroTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsRemaining: 0,
            initialSeconds: 15,
            enableStartButton: true,
            enableResetButton: false,
            enableStopButton: false
        };
    }
    tick() {
        this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
        if (this.state.secondsRemaining <= 0) {
            clearInterval(this.interval);
        }
    }
    componentDidMount() {
        this.resetTimer();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    stopTimer() {
        clearInterval(this.interval);
        this.setState({ enableStartButton: true, enableStopButton: false, enableResetButton: true });
    }
    startTimer() {
        this.interval = setInterval(this.tick.bind(this), 1000);
        this.setState({ enableStartButton: false, enableStopButton: true, enableResetButton: false });
    }
    resetTimer() {
        this.setState({ secondsRemaining: this.state.initialSeconds });
        this.setState({ enableStartButton: true, enableStopButton: false, enableResetButton: false });
    }
    selectedTaskHandler(task) {
        console.log(task);
        this.setState({ secondsRemaining: task.durationInSeconds, initialSeconds: task.durationInSeconds });
    }
    render() {
        return (
            <div className="section-border">
                <div className="panel panel-default">
                    <div className="panel-heading">POMODORO
                    <TaskDropdown selectedValueHandler={this.selectedTaskHandler.bind(this)} />
                        <div className="btn-group btn-group-justified" role="group">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-success">Pomodoro</button>
                            </div>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-success">Short Break</button>
                            </div>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-success">Long Break</button>
                            </div>
                        </div>

                    </div>
                    <div className="panel-body">
                        Seconds Remaining: {this.state.secondsRemaining}
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="panel-footer">
                            <button className="btn btn-danger" onClick={this.stopTimer.bind(this)}
                                disabled={!this.state.enableStopButton}>Stop</button>
                            <button className="btn btn-success" onClick={this.startTimer.bind(this)}
                                disabled={!this.state.enableStartButton}>Start</button>
                            <button className="btn btn-warning" onClick={this.resetTimer.bind(this)}
                                disabled={!this.state.enableResetButton}>Reset</button>
                            <button className="btn btn-info">Complete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};