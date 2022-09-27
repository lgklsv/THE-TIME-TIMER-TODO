import './styles/main.scss';
import * as model from './model.js';
import addListView from './views/addListView';
import listView from './views/listView';
import { MODAL_CLOSE_SEC } from './config';








const controlAddLists = function(newList) {
    console.log(newList);
    listView.render(newList);

    // Close form window
    setTimeout(function() {
        addListView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
}






// REFACTOR ASAP
// //////////////////////////////////////////////////////////
// Theme switcher
const toggleSwitch = document.querySelector('#themeSwitcher');
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'vscode');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'playingCards');
    } 
};
toggleSwitch.addEventListener('change', switchTheme, false);


// //////////////////////////////////////////////////////////
// Task line-through
const taskBox = document.querySelector('.tasks-container');
taskBox.addEventListener('change', changeText);
function changeText(e)  {
    if(e.target.checked) {
        e.target.parentElement.nextElementSibling.firstElementChild.firstElementChild.classList.add('task-title-checked');
    }
    else {
        e.target.parentElement.nextElementSibling.firstElementChild.firstElementChild.classList.remove('task-title-checked');
    }
    e.stopPropagation();
}

// //////////////////////////////////////////////////////////
// Timer progress bar
const circle = document.querySelector('.progressbar-ring-circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const inputTest = document.querySelector('.percent-test');
const resetBtn = document.querySelector('#reset-button');

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

//Init setting
setProgress(100);

inputTest.addEventListener('change', function() {
    setProgress(inputTest.value);
})
resetBtn.addEventListener('click', function() {
    resetBtn.classList.add('rotate');
    inputTest.value = 100;
    setProgress(100);
    setTimeout(function(){
        resetBtn.classList.remove('rotate');
    }, 500);
})


const init = function() {
    addListView._addHandlerUploadNewList(controlAddLists);
}
init();