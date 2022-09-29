import listView from "./views/listView";
import tasksView from "./views/tasksView";

export const state = {
    pomodoro: 1500,
    lists: [],
    theme: 'vscode',

}

// const createTaskObj = function(data) {
//     const {task} = data;
//     return state.task = {
//         id: task.id,
//         title: task.title,
//         subtitle: task.subtitle,
//         done: task.done,
//         pomreq: task.pomreq,
//         pomdone: task.pomdone,
//     }
// }

// const createListObj = function(data) {
//     const { lists } = data;
//     return state.lists = {
//         id: lists.id,
//         title: lists.title,
//         tasks: lists.tasks,
//     }
// }

// ///////////////
// TEMPORARY INIT
export const initLists = function() {
    state.lists.push({
        listName: 'Today',
        active: true,
        tasks: [],
        id: Math.random().toString(36),
    });
}

export const addList = function(list) {
    state.lists.length == 0 ? list.active = true : list.active = false;
    list.tasks = [];
    list.id = Math.random().toString(36);
    state.lists.push(list);
    console.log(state.lists);
}

export const addTask = function(taskObj) {
    const activeList = state.lists.find(obj => obj.active === true);
    activeList.tasks.length == 0 ? taskObj.active = true : taskObj.active = false;

    taskObj.id = Math.random().toString(36);

    console.log(taskObj, activeList);

    activeList.tasks.push(taskObj);
    
    return activeList;
}


export const loadTasks = function(id) {
    const prevActiveList = state.lists.find(obj => obj.active === true);
    if (prevActiveList) {
        prevActiveList.active = false;
    };
    const data = state.lists.find(obj => obj.id === id);
    data.active = true;
    return data;
}

export const activateTask = function(id) {
    const activeListObj = state.lists.find(obj => obj.active === true);
    const prevActiveTask = activeListObj.tasks.find(taskObj => taskObj.active === true);
    if (prevActiveTask) {
        prevActiveTask.active = false;
    };
    const data = activeListObj.tasks.find(taskObj => taskObj.id === id);
    data.active = true;
    return activeListObj;
}