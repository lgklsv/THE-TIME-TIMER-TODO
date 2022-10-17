import './styles/main.scss';
import * as model from './model.js';
import addListView from './views/addListView';
import listView from './views/listView';
import previewListView from './views/previewListView';
import { MODAL_CLOSE_SEC } from './config';
import tasksView from './views/tasksView';
import * as helpers from './helpers.js';
import addTaskView from './views/addTaskView';
import timerView from './views/timerView';



const controlAddLists = function(newList) {

    // Add list to the state
    model.addList(newList);

    // Render lists on the page
    listView.render(model.state.lists);

    // Close form window
    setTimeout(function() {
        addListView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
}

const controlAddTask = function(newTask) {
    const curList = model.addTask(newTask);

    tasksView.render(curList);
    listView.update(model.state.lists);

    // Close form window
    setTimeout(function() {
        addTaskView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
}

const controlRenderTasks = function(id) {
    tasksView.render(model.loadTasks(id));
    listView.update(model.state.lists);
}

const controlActivateTask = function(id) {  
    tasksView.render(model.activateTask(id));
}

const controlCheckedTask = function(id, check) {
    tasksView.update(model.checkTask(id, check));
}

const controlEditList = function(data) {
    const curList = model.editList(data);
    curList.active ? tasksView.update(curList) : '';
    listView.render(model.state.lists);
}

const controlDeleteList = function(id) {
    const delListRes = model.deleteList(id);
    if (typeof delListRes !== 'undefined') {
        tasksView.render(delListRes);
    }
    listView.render(model.state.lists);
}

const controlEditTask = function(data) {
    const curList = model.editTask(data);
    tasksView.render(curList);
}

const controlDeleteTask = function(id) {
    const curList = model.deleteTask(id);
    tasksView.render(curList);
    listView.update(model.state.lists);
}

const controlDeleteAllCompleted = function() {
    const curList = model.deleteCompleted();
    tasksView.render(curList);
    listView.update(model.state.lists);
}

const conrtolStartTimer = function(seconds, minutes, indicator) {
    console.log(seconds, minutes, indicator);
    model.startTimer(seconds, minutes, indicator);
}


// ///////////////
// TEMPORARY INIT
const initRendelLists = function() {
    model.initLists();
    listView.render(model.state.lists);
    tasksView.render(model.state.lists[0]);
}

const init = function() {
    initRendelLists();
    addListView._addHandlerUploadNewList(controlAddLists);
    addTaskView._addHandlerUploadNewTask(controlAddTask);

    listView.addHandlerRenderTasks(controlRenderTasks);
    listView._addHandlerEditList(controlEditList);
    listView._addHandlerDeleteList(controlDeleteList);

    tasksView.addHandlerCheckedTask(controlCheckedTask);
    tasksView.addHandlerActivateTask(controlActivateTask);
    tasksView._addHandlerEditTask(controlEditTask);
    tasksView._addHandlerDeleteTask(controlDeleteTask);
    tasksView._addHandlerDeleteAllCompleted(controlDeleteAllCompleted);

    timerView._addHandlerStartTimer(conrtolStartTimer);
}
init();