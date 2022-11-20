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
import menuView from './views/menuView';
import settingsView from './views/settingsView';
import * as auth from './auth';

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
    model.startTimer(seconds, minutes, indicator);
}

const controlResetTimer = function(seconds, minutes, indicator) {
    model.resetTimer(seconds, minutes, indicator);
}

const controlPauseTimer = function() {
    model.pauseTimer();
}

const controlTimerMode = function(mode, seconds, minutes, indicator) {
    model.setMode(mode);
    model.resetTimer(seconds, minutes, indicator);
}

const controlThemeSwitch = function() {
    menuView.render(model.state.themes);
}

const controlChangeTheme = function(theme) {
    model.state.theme = theme;
    model.persistThemes();
}

const controlSettings = function(data, seconds, minutes, indicator) {
    model.setSettings(data);
    model.resetTimer(seconds, minutes, indicator);
}

const controlLogin = function() {
    console.log('hi');
}
 
// ///////////////
// TEMPORARY INIT
export const initState = function() {
    // Set theme form themeState
    const storage = localStorage.getItem('theme');
    if(storage && !model.state.login)  {
        model.state.theme = JSON.parse(storage);
    }
    const stateStorage = localStorage.getItem('state');
    if(stateStorage && !model.state.login) {
        model.state.pomodoro = JSON.parse(stateStorage).pomodoro;
        model.state.counterValue = JSON.parse(stateStorage).counterValue;
        model.state.counter = JSON.parse(stateStorage).counter;
        model.state.shortBreak = JSON.parse(stateStorage).shortBreak;
        model.state.longBreak = JSON.parse(stateStorage).longBreak;
        model.state.mode = JSON.parse(stateStorage).mode;
        model.state.lists = JSON.parse(stateStorage).lists;
        model.state.dots = JSON.parse(stateStorage).dots;
        model.state.longBreakCounter = JSON.parse(stateStorage).longBreakCounter;
        model.state.completeAudio = JSON.parse(stateStorage).completeAudio;
        model.state.audios = JSON.parse(stateStorage).audios;
        model.state.alarmVolume = JSON.parse(stateStorage).alarmVolume;
    }
    
    // timer alarm init
    model.audiosArr[model.state.completeAudio].volume = model.state.alarmVolume / 100;
    document.getElementById('timer-volume').value = model.state.alarmVolume;
    document.querySelector('.timer-volume__cur').textContent = model.state.alarmVolume;

    // theme init
    document.documentElement.setAttribute('data-theme', model.state.theme);

    // lists init
    if(model.state.lists.length == 0) {
        model.initLists();
    }

    // timer init
    model.initTimer();

    listView.render(model.state.lists);
    tasksView.render(model.state.lists[0]);

    model.persistThemes();
    model.persistState();
}

const init = function() {
    initState();
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
    timerView._addHandlerResetTimer(controlResetTimer);
    timerView._addHandlerPauseTimer(controlPauseTimer);
    timerView._addHandlerChangeMode(controlTimerMode);

    menuView._addHandlerShowThemes(controlThemeSwitch);
    menuView._addHandlerChangeTheme(controlChangeTheme);
    menuView._addHandlerShowLogin(controlLogin);

    settingsView._addHandlerUploadSettings(controlSettings);


}
init();