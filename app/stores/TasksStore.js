import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import TasksActionTypes from '../constants/tasksActionTypes';

class TasksStore extends EventEmitter {
    constructor() {
        super();
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        if (tasks == undefined) {
            tasks = [
                { id: 1, name: 'Finish Week 1 Deck', description: 'Introduction, React Component, JSX, Virtual DOM', priority: '1', status: 'To Do' },
                { id: 2, name: 'Finish Week 1 Quiz', description: 'Introduction to MMR', priority: '2', status: 'Done' },
                { id: 3, name: 'Finish Week 3 Deck', description: 'Props and State', priority: '3', status: 'Done' },
                { id: 4, name: 'Task Menu', description: 'Sample Description: Assignment', priority: '3', status: 'In Progress' },
                { id: 5, name: 'Header Menu', description: 'Task Description: Assignment', priority: '3', status: 'Done' },
                { id: 6, name: 'Footer Menu', description: 'Hello World: Assignment', priority: '2', status: 'In Progress' }];
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        this._state = {
            isLoading: false,
            tasks: tasks
        }
    }

    getTasks() {
        return this._state.tasks;
    }
    addTask(task) {
        const id = Date.now();
        this._state.tasks.push({
            id: id,
            name: task.name,
            description: task.description,
            priority: task.priority,
            status: task.status
        })
        this.updateLocalStorage();
    }
    updateTask(task) {
        let currentTask = _.find(this._state.tasks, function (i) {
            return i.id == task.id
        });
        if (currentTask != undefined) {
            currentTask.name = task.name;
            currentTask.description = task.description;
            currentTask.priority = task.priority;
            currentTask.status = task.status;
        }
        this.updateLocalStorage();
    }
    deleteTask(task) {
        _.remove(this._state.tasks, function (obj) {
            return obj.id === task.id;
        });
        this.updateLocalStorage();
    }
    isLoading() {
        return this._state.isLoading;
    }
    updateLocalStorage(){
        localStorage.removeItem('tasks');
        localStorage.setItem("tasks", JSON.stringify(this._state.tasks));
    }
    handleAction(action) {
        console.log("action", action.type);
        switch (action.type) {
            case TasksActionTypes.GET_TASKS: {
                this.getTasks();
                this.emit('change');
                break;
            }
            case TasksActionTypes.ADD_TASK: {
                this.addTask(action.task);
                this.emit('change');
                break;
            }
            case TasksActionTypes.DELETE_TASK: {
                this.deleteTask(action.task);
                this.emit('change');
                break;
            }
            case TasksActionTypes.UPDATE_TASK: {
                this.updateTask(action.task);
                this.emit('change');
                break;
            }
        }
    }
}

const tasksStore = new TasksStore();
tasksStore.dispatchToken = Dispatcher.register(tasksStore.handleAction.bind(tasksStore));

window.Dispatcher = Dispatcher;
export default tasksStore;

