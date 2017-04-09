import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

import TasksActionTypes from '../constants/tasksActionTypes';

import TasksStore from './TasksStore';

class PriorityStore extends EventEmitter {
    constructor() {
        super();
        TasksStore.on('change', this.getOpenTask.bind(this));
    }

    getHighPriorities() {
        let tasks = TasksStore.getTasks();
        return _.filter(tasks,
            function (o) { return o.priority === '3' && o.status != 'Done' });
    };

    getOpenTask() {
        let tasks = TasksStore.getTasks();
        return _.filter(tasks,
            function (o) { return o.status != 'Done' });
    };

    handleAction(action) {
        console.log("action", action.type);
    }
}

const priorityStore = new PriorityStore();
priorityStore.dispatchToken = Dispatcher.register(priorityStore.handleAction.bind(priorityStore));

window.Dispatcher = Dispatcher;
export default priorityStore;

