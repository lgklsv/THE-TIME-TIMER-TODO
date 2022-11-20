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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import {
    collection,
    getDocs,
    getFirestore,
    addDoc,
    doc,
    setDoc
} from 'firebase/firestore';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCk1gJT456iJ0PLBR3hGyo70pKYt7tVSRo",
    authDomain: "the-time-timer-plus-todo.firebaseapp.com",
    projectId: "the-time-timer-plus-todo",
    storageBucket: "the-time-timer-plus-todo.appspot.com",
    messagingSenderId: "1035068195554",
    appId: "1:1035068195554:web:4d4e4f09131dc30b88d4bb",
    measurementId: "G-XQ8KM95L9E"
};

// Init firebase app
initializeApp(firebaseConfig);

// Init sevices
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, 'users');

// get collection data
getDocs(colRef).then((snapshot) => {
    let users = [];
    snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
    })
    console.log(users);
}).catch(err => {
    console.log(err);
})

const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created:', cred.user);
            
            const docRef = doc(db, 'users', cred.user.uid);

            return setDoc(docRef, {
                theme: model.state.theme
            });
        }).then(() => {
            signupForm.reset();
        })
        .catch ((err) => {
            console.log(err.message);
        })
}) 

const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('The user signed out');
        }).catch((err) => {
            console.log(err.message);
        })
})

const loginForm = document.querySelector('.signin');
loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user logged in:', cred.user);
            loginForm.reset();
        }).catch((err) => {
            console.log(err.message);
        })
}) 


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
const initState = function() {
    // Set theme form themeState
    const storage = localStorage.getItem('theme');
    if(storage)  {
        model.state.theme = JSON.parse(storage);
    }
    const stateStorage = localStorage.getItem('state');
    if(stateStorage) {
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