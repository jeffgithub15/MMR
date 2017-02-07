
import Lodash from 'lodash';


export function Save(task) {
    var tasks = JSON.parse(localStorage.getItem('tasks'))
    var currentTask = Lodash.find(tasks, function (i) {
        return i.id == task.id
    })
    if (currentTask == undefined) {
        var lastTask = Lodash.maxBy(tasks, 'id');
        if (lastTask != undefined) {
            task.id = lastTask.id + 1;
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
    var tasks = JSON.parse(localStorage.getItem('tasks'))
    var currentTask = Lodash.find(tasks, function (i) {
        return i.id == task.id
    })
    if (currentTask != undefined) {
        {
            Lodash.remove(tasks, {id: task.id});
            localStorage.removeItem('tasks');
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
}

export function GetTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'))
    return tasks;
}

export function InitTaskData() {
    var tasks = [
        { id: 1, name: 'Finish Week 1 Deck', description: 'Introduction, React Component, JSX, Virtual DOM', priority: '1', status: 'Done' },
        { id: 2, name: 'Finish Week 1 Quiz', description: 'Introduction to MMR', priority: '2', status: 'Done' },
        { id: 3, name: 'Finish Week 3 Deck', description: 'Props and State', priority: '3', status: 'Done' },
        { id: 4, name: 'Sample 1', description: 'Assignment', priority: '3', status: 'Done' }];

    localStorage.setItem("tasks", JSON.stringify(tasks));
}