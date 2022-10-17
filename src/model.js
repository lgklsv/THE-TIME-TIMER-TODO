import listView from "./views/listView";
import tasksView from "./views/tasksView";

export const state = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 600,
    lists: [],
    theme: 'vscode',

}

// ///////////////
// TEMPORARY INIT
export const initLists = function() {
    state.lists.push({
        listName: 'Today',
        active: true,
        tasks: [],
        id: Math.random().toString(36),
        initialList: true,
        completed: 0,
    });
}

export const addList = function(list) {
    state.lists.length == 0 ? list.active = true : list.active = false;
    list.tasks = [];
    list.initialList = false;
    list.id = Math.random().toString(36);
    list.completed = 0;
    state.lists.push(list);
}

export const addTask = function(taskObj) {
    const activeList = state.lists.find(obj => obj.active === true);
    activeList.tasks.length == 0 ? taskObj.active = true : taskObj.active = false;

    taskObj.id = Math.random().toString(36);
    taskObj.checked = false;
    
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

export const checkTask = function(id, check) {
    const activeListObj = state.lists.find(obj => obj.active === true);
    const data = activeListObj.tasks.find(taskObj => taskObj.id === id);
    
    data.checked = check;
    let countCompleted = 0;
    activeListObj.tasks.forEach(task => {
        if (task.checked) {
            countCompleted++;
        }
    })
    activeListObj.completed = countCompleted;
    return activeListObj;
}

export const editList = function(data) {
    const curList = state.lists.find(obj => obj.id === data.id);
    curList.listName = data.editedListValue;
    return curList;
}

export const deleteList = function(id) {
    const listToDelete = state.lists.find(obj => obj.id === id);
    const indexToDelete = state.lists.indexOf(listToDelete);
    const prevList = state.lists[indexToDelete - 1];
    if (indexToDelete - 1 >= 0 && (listToDelete.active || prevList.active)) {
        prevList.active = true;
        state.lists.splice(indexToDelete, 1);
        return prevList;
    } else {
        state.lists.splice(indexToDelete, 1);
    }
}

export const editTask = function(data) {
    const curList = state.lists.find(obj => obj.active === true);
    const taskToEdit = curList.tasks.find(taskObj => taskObj.id === data.id);
    taskToEdit.taskName = data.editedTaskValue;
    taskToEdit.subName = data.editedTaskSubtitleValue;
    taskToEdit.estPom = data.estPom;
    return curList;
}

export const deleteTask = function(id) {
    const curList = state.lists.find(obj => obj.active === true);
    const taskToDelete = curList.tasks.find(taskObj => taskObj.id === id);
    if (taskToDelete.checked) {
        curList.completed--;
    }
    const indexToDelete = curList.tasks.indexOf(taskToDelete);
    if (indexToDelete - 1 >= 0 && taskToDelete.active) {
        const prevTask = curList.tasks[indexToDelete - 1];
        prevTask.active = true;
    } else if (indexToDelete == 0 && taskToDelete.active && curList.tasks.length > 1){
        const nextTask = curList.tasks[indexToDelete + 1];
        nextTask.active = true;
    }
    curList.tasks.splice(indexToDelete, 1);
    return curList;
}

export const deleteCompleted = function() {
    const curList = state.lists.find(obj => obj.active === true);
    console.log(curList);
    const clearedTasks = curList.tasks.filter(el => el.checked == false);
    curList.tasks = clearedTasks;
    curList.completed = 0;
    return curList;
}