export const state = {
    task: {},
    pomodoro: 1500,
    lists: [],
    theme: 'vscode'
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

export const addList = function(list) {
    list.tasks = [];
    list.id = Math.random().toString(36);
    state.lists.push(list);
    console.log(state.lists);
}



export const loadTasks = function(id) {
    const data = state.lists.find(obj => obj.id === id);
    return data;
}