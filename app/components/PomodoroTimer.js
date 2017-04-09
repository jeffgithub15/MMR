
import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TaskTable from './tasks';
import TaskDropdown from './taskdropdown';
import TasksStore from '../stores/TasksStore'
import ConfigurationStore from '../stores/ConfigurationStore'
import PomodoroConfig from '../constants/pomodoroConfiguration';
import TaskStatus from '../constants/taskStatus';
import * as TimerHelper from '../helpers/timerHelper';
import * as taskActions from '../actions/taskActions'
import AlertMessage from './alertmessage';

export default class PomodoroTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsRemaining: 0,
            minutesRemaining: 0,
            initialMinute: 0,
            enableStartButton: true,
            enableResetButton: false,
            enableStopButton: false,
            currentTask: null,
            showAlert: false
        };
    }
    tick() {
        if (this.state.minutesRemaining > 0 || this.state.secondsRemaining > 0) {
            const minutes = TimerHelper.ComputeMinute(this.state.minutesRemaining, this.state.secondsRemaining);
            const seconds = TimerHelper.ComputeSecond(this.state.minutesRemaining, this.state.secondsRemaining);
            this.setState({ secondsRemaining: seconds, minutesRemaining: minutes });
        }
        else {
            clearInterval(this.interval);
            this.complete();
            this.setState({ enableStartButton: true, enableStopButton: false, enableResetButton: true });   
            this.setState({ showAlert: true });
        }
    }
    componentDidMount() {
        this.resetTimer();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    stopTimer() {
        if (this.state.currentTask != null) {
            let task = this.state.currentTask;
            task.status = TaskStatus.IN_PROGRESS;
            task.durationInMinutes = this.state.minutesRemaining;
            task.durationInSeconds = this.state.secondsRemaining;
            taskActions.editTask(task);
        }
        clearInterval(this.interval);
        this.setState({ enableStartButton: true, enableStopButton: false, enableResetButton: true });        
    }
    startTimer() {
        if (this.state.currentTask != null) {
            let task = this.state.currentTask;
            task.status = TaskStatus.IN_PROGRESS;
            task.durationInMinutes = this.state.minutesRemaining;
            task.durationInSeconds = this.state.secondsRemaining;
            taskActions.editTask(task);
        }

        this.interval = setInterval(this.tick.bind(this), 1000);
        this.setState({ enableStartButton: false, enableStopButton: true, enableResetButton: false });
    }
    resetTimer() {
        this.setState({ minutesRemaining: this.state.initialMinute, secondsRemaining: 0 });
        this.setState({ enableStartButton: true, enableStopButton: false, enableResetButton: false });
    }
    shortBreak() {
        const shortBreak = ConfigurationStore.getConfigurationById(PomodoroConfig.SHORT_BREAK);
        this.setState({ secondsRemaining: 0, minutesRemaining: shortBreak.durationInMinutes, initialMinute: shortBreak.durationInMinutes, currentTask: null });
        this.setState({ enableStartButton: true, enableStopButton: false, enableResetButton: false });
    }
    longBreak() {
        const longBreak = ConfigurationStore.getConfigurationById(PomodoroConfig.LONG_BREAK);
        this.setState({ secondsRemaining: 0, minutesRemaining: longBreak.durationInMinutes, initialMinute: longBreak.durationInMinutes, currentTask: null });
        this.setState({ enableStartButton: true, enableStopButton: false, enableResetButton: false });
    }
    pomodoro() {
        let pomodoro = ConfigurationStore.getConfigurationById(PomodoroConfig.POMODORO);
        this.setState({ secondsRemaining: 0, minutesRemaining: pomodoro.durationInMinutes, initialMinute: pomodoro.durationInMinutes });
        this.setState({ enableStartButton: true, enableStopButton: false, enableResetButton: false });
    }
    complete() {
        if (this.state.currentTask != null) {
            let task = this.state.currentTask;
            task.status = TaskStatus.DONE;
            task.durationInMinutes = 0;
            task.durationInSeconds = 0;
            taskActions.editTask(task);
        }
        else {
            console.log('No task to complete!');
        }
    }
    selectedTaskHandler(task) {
        let durationInSeconds = 0;
        let durationInMinutes = 0;
        let currentTask = null;

        if (task != undefined) {
            currentTask = task;
            durationInMinutes = task.durationInMinutes;
            durationInSeconds = task.durationInSeconds;
        }
        this.setState({ secondsRemaining: durationInSeconds, initialMinute: durationInMinutes, currentTask: currentTask, minutesRemaining: durationInMinutes });
    }
    alertHandler(close){
        this.setState({ showAlert: false});
    }
    render() {
        return (
            <div>
                <AlertMessage showModal={this.state.showAlert} alertHandler={this.alertHandler.bind(this)} />
                <div className="section-border">
                    <div className="panel panel-default">
                        <div className="panel-heading">POMODORO
                    <TaskDropdown selectedValueHandler={this.selectedTaskHandler.bind(this)} />
                            <div className="btn-group btn-group-justified" role="group">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-success" onClick={this.pomodoro.bind(this)}>Pomodoro</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-success" onClick={this.shortBreak.bind(this)}>Short Break</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-success" onClick={this.shortBreak.bind(this)}>Long Break</button>
                                </div>
                            </div>

                        </div>
                        <div className="panel-body">
                            <div className="pomodoro-time-label">{this.state.minutesRemaining} : {this.state.secondsRemaining}</div>
                        </div>
                        <div className="text-center">
                            <div className="panel-footer">
                                <button className="btn btn-danger" onClick={this.stopTimer.bind(this)}
                                    disabled={!this.state.enableStopButton}>Stop</button>
                                <button className="btn btn-success" onClick={this.startTimer.bind(this)}
                                    disabled={!this.state.enableStartButton}>Start</button>
                                <button className="btn btn-warning" onClick={this.resetTimer.bind(this)}
                                    disabled={!this.state.enableResetButton}>Reset</button>
                                <button className="btn btn-info" onClick={this.complete.bind(this)}>Complete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};