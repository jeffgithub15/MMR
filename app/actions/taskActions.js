import Dispatcher from '../dispatcher';

import TasksActionTypes from '../constants/tasksActionTypes';

export function addTask(task){
    Dispatcher.dispatch({
        type: TasksActionTypes.ADD_TASK,
        task: task
    })
}

export function editTask(task){
    Dispatcher.dispatch({
        type: TasksActionTypes.UPDATE_TASK,
        task: task
    })
}

export function deleteTask(task){
    Dispatcher.dispatch({
        type: TasksActionTypes.DELETE_TASK,
        task: task
    })
}