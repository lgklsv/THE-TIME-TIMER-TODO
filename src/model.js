import listView from "./views/listView";
import tasksView from "./views/tasksView";
import * as helpers from './helpers.js';
import original from './assets/audio/original.mp3';
import doorbell from './assets/audio/doorbell.mp3';
import done from './assets/audio/done.mp3';
import clicking from './assets/audio/clicking.mp3';

export const audiosArr = {
    original: new Audio(original), 
    doorbell: new Audio(doorbell), 
    done: new Audio(done), 
    clicking: new Audio(clicking)
};

export const state = {
    pomodoro: 0.1 * 60,
    counter: -1,
    counterValue: 0.1 * 60,
    shortBreak: 5 * 60,
    longBreak: 10 * 60,
    mode: 'pomodoro',
    lists: [],
    theme: 'light',
    themes: ['dark', 'light', 'vscode', 'oneDark', 'playingCards', 'purple', 'coffee', 'strawberry'],
    dots: 0,
    longBreakCounter: 4,
    completeAudio: 'original',
    audios: ['original','doorbell', 'done', 'clicking'],
    alarmVolume: 100,
}

export const persistThemes = function() {
    localStorage.setItem('theme', JSON.stringify(state.theme));
    localStorage.setItem('themes', JSON.stringify(state.themes));
}

export const persistState = function() {
    localStorage.setItem('state', JSON.stringify(state));
}


const getMin = function(timer) {
    return timer < 60 ? '00' : (Math.floor(timer / 60)).toString().padStart(2, '0')
}

const getSec = function(timer) {
    return timer < 60 ? (Math.floor(timer)).toString().padStart(2, '0') : '00'
}

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

export const initTimer = function() {
    document.querySelector('.minutes').textContent = getMin(state.pomodoro);
    document.querySelector('.seconds').textContent = getSec(state.pomodoro);
    const dotsArr = Array.from(document.querySelectorAll('.dot'));
    for(let i = 0; i < state.dots; i++) {
        dotsArr[i].classList.add('dot_active');
    }

    helpers.activateTimerBtn(document.getElementById(`${state.mode}`));
    resetTimer(document.querySelector('.seconds'), document.querySelector('.minutes'), document.querySelector('.indicator'));
}

export const addList = function(list) {
    state.lists.length == 0 ? list.active = true : list.active = false;
    list.tasks = [];
    list.initialList = false;
    list.id = Math.random().toString(36);
    list.completed = 0;
    state.lists.push(list);
    persistState();
}

export const addTask = function(taskObj) {
    const activeList = state.lists.find(obj => obj.active === true);
    activeList.tasks.length == 0 ? taskObj.active = true : taskObj.active = false;

    taskObj.id = Math.random().toString(36);
    taskObj.checked = false;
    taskObj.completedPom = 0;
    
    activeList.tasks.push(taskObj);
    persistState();
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
    persistState();
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
    persistState();
    return activeListObj;
}

export const editList = function(data) {
    const curList = state.lists.find(obj => obj.id === data.id);
    curList.listName = data.editedListValue;
    persistState();
    return curList;
}

export const deleteList = function(id) {
    const listToDelete = state.lists.find(obj => obj.id === id);
    const indexToDelete = state.lists.indexOf(listToDelete);
    const prevList = state.lists[indexToDelete - 1];
    if (indexToDelete - 1 >= 0 && (listToDelete.active || prevList.active)) {
        prevList.active = true;
        state.lists.splice(indexToDelete, 1);
        persistState();
        return prevList;
    } else {
        state.lists.splice(indexToDelete, 1);
        persistState();
    }
}

export const editTask = function(data) {
    const curList = state.lists.find(obj => obj.active === true);
    const taskToEdit = curList.tasks.find(taskObj => taskObj.id === data.id);
    taskToEdit.taskName = data.editedTaskValue;
    taskToEdit.subName = data.editedTaskSubtitleValue;
    taskToEdit.estPom = data.estPom;
    persistState();
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
    persistState();
    return curList;
}

export const deleteCompleted = function() {
    const curList = state.lists.find(obj => obj.active === true);
    const clearedTasks = curList.tasks.filter(el => el.checked == false);
    curList.tasks = clearedTasks;
    curList.completed = 0;
    persistState();
    return curList;
}

const checkMode = function() {
    let curTimer;
    if(state.mode == 'pomodoro') {
        curTimer = state.pomodoro;
    }
    if(state.mode == 'short-break') {
        curTimer = state.shortBreak;
    }
    if(state.mode == 'long-break') {
        curTimer = state.longBreak;
    }
    persistState();
    return curTimer;
}

export const setMode =  function(mode) {
    state.mode = mode;
    if(mode == 'pomodoro') {
        state.counterValue = state.pomodoro;
        setTitle(getSec(state.pomodoro), getMin(state.pomodoro));
    }
    if(mode == 'short-break') {
        state.counterValue = state.shortBreak;
        setTitle(getSec(state.shortBreak), getMin(state.shortBreak));
    }
    if(mode == 'long-break') {
        state.counterValue = state.longBreak;
        setTitle(getSec(state.longBreak), getMin(state.longBreak));
    }
    persistState();
} 

export const setTitle = function(sec, min) {
    let formatedSec = sec.toString().padStart(2, '0');
    let formatedMin = min.toString().padStart(2, '0');
    document.title = `${formatedMin}:${formatedSec} | THE TIME TIMER + TODO`;
}

export const startTimer = function(seconds, minutes, indicator) {
    let curTimer = checkMode();

    if (state.counter == -1 && state.counterValue > 0) {
        state.counter = setInterval(() => {
            let rest = --state.counterValue;
            let min = Math.floor(rest / 60);
            let sec = Math.floor(rest % 60);
            setTitle(sec, min);
            seconds.textContent = sec.toString().padStart(2, '0');
            minutes.textContent = min.toString().padStart(2, '0');
            indicator.style.strokeDashoffset = 600 - (rest / curTimer) * 600;

            if (rest == 0) {
                clearInterval(state.counter);
                const curList = state.lists.find(obj => obj.active === true);
                const dotsArr = Array.from(document.querySelectorAll('.dot'));
                if(curList.tasks.length > 0) {
                    const activeTask = curList.tasks.find(taskObj => taskObj.active === true);
                    activeTask.completedPom++;
                    tasksView.update(curList);
                }
                if (state.mode == 'pomodoro' && state.dots != 4) {
                    state.mode = 'short-break';
                    state.dots++;
                    
                    audiosArr[state.completeAudio].play();

                    for(let i = 0; i < state.dots; i++) {
                        dotsArr[i].classList.add('dot_active');
                    }
                    helpers.activateTimerBtn(document.getElementById('short-break'));
                }
                else if (state.mode == 'short-break') {
                    state.mode = 'pomodoro';
                    audiosArr[state.completeAudio].play();
                    helpers.activateTimerBtn(document.getElementById('pomodoro'));
                }
                else if (state.mode == 'pomodoro' && state.dots == state.longBreakCounter) {
                    state.mode = 'long-break';
                    audiosArr[state.completeAudio].play();
                    helpers.activateTimerBtn(document.getElementById('long-break'));
                    for(let i = 0; i < state.dots; i++) {
                        dotsArr[i].classList.remove('dot_active');
                    }
                    state.dots = 0; 
                }
                else if (state.mode == 'long-break') {
                    state.mode = 'pomodoro';
                    audiosArr[state.completeAudio].play();
                    helpers.activateTimerBtn(document.getElementById('pomodoro'));
                }
                document.querySelector('.pause-btn').classList.add('really-hidden');
                document.querySelector('.start-btn').classList.remove('really-hidden');
                resetTimer(seconds, minutes, indicator);
            }
        }, 1000);
    }
}

export const resetTimer = function(seconds, minutes, indicator) {
    let curTimer = checkMode();

    clearInterval(state.counter);
    state.counter = -1;
    state.counterValue = curTimer;
    let min = Math.floor(state.counterValue / 60);
    let sec = Math.floor(state.counterValue % 60);

    setTitle(sec, min);
    seconds.textContent = sec.toString().padStart(2, '0');
    minutes.textContent = min.toString().padStart(2, '0');
    indicator.style.strokeDashoffset = 600 - (state.counterValue / curTimer) * 600;
}

export const pauseTimer = function() {
    clearInterval(state.counter);
    state.counter = -1;
}

export const setSettings = function(data) {
    state.pomodoro = +data.pomodoro * 60;
    state.counterValue = +data.pomodoro * 60;
    state.shortBreak = +data.shortBreak * 60;
    state.longBreak = +data.longBreak * 60;
    state.alarmVolume = +data.volume;
    state.completeAudio = state.audios[+data.sound];
    persistState();
}