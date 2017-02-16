
import Lodash from 'lodash';


export function Save(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    let currentTask = Lodash.find(tasks, function (i) {
        return i.id == task.id
    })
    if (currentTask == undefined) {
        const lastTask = Lodash.maxBy(tasks, 'id');
        if (lastTask != undefined) {
            task.id = lastTask.id + 1;
        }
        else if (tasks.length == 0) {
            task.id = 1;
        }
        tasks.push(task);
    }
    else {
        currentTask.name = task.name;
        currentTask.description = task.description;
        currentTask.priority = task.priority;
        currentTask.status = task.status;
    }

    localStorage.removeItem('tasks');
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function Delete(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    const currentTask = Lodash.find(tasks, function (i) {
        return i.id == task.id
    })
    if (currentTask != undefined) {
        {
            Lodash.remove(tasks, { id: task.id });
            localStorage.removeItem('tasks');
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
}

export function GetTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    return tasks;
}

export function InitTaskData() {
    const tasks = [
        { id: 1, name: 'Finish Week 1 Deck', description: 'Introduction, React Component, JSX, Virtual DOM', priority: '1', status: 'To Do' },
        { id: 2, name: 'Finish Week 1 Quiz', description: 'Introduction to MMR', priority: '2', status: 'Done' },
        { id: 3, name: 'Finish Week 3 Deck', description: 'Props and State', priority: '3', status: 'Done' },
        { id: 4, name: 'Task Menu', description: 'Sample Description: Assignment', priority: '3', status: 'In Progress' },
        { id: 5, name: 'Header Menu', description: 'Task Description: Assignment', priority: '3', status: 'Done' },
        { id: 6, name: 'Footer Menu', description: 'Hello World: Assignment', priority: '2', status: 'In Progress' }];

    localStorage.setItem("tasks", JSON.stringify(tasks));
}