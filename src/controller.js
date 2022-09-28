import './styles/main.scss';
import * as model from './model.js';
import addListView from './views/addListView';
import listView from './views/listView';
import previewListView from './views/previewListView';
import { MODAL_CLOSE_SEC } from './config';
import tasksView from './views/tasksView';
import * as helpers from './helpers.js';


const controlAddLists = function(newList) {

    // Add list to the state
    model.addList(newList)

    // Render lists on the page
    listView.render(model.state.lists);

    // Close form window
    setTimeout(function() {
        addListView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
}


const controlRenderTasks = function(id) {
    // console.log(id);
    // console.log(model.loadTasks(id));
    tasksView.render(model.loadTasks(id));
}

// REFACTOR ASAP
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


const init = function() {
    addListView._addHandlerUploadNewList(controlAddLists);
    listView.addHandlerRenderTasks(controlRenderTasks);
}
init();