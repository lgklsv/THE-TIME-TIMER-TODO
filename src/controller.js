import './styles/main.scss';
import * as model from './model.js';
import addListView from './views/addListView';
import listView from './views/listView';
import previewListView from './views/previewListView';
import { MODAL_CLOSE_SEC } from './config';
import tasksView from './views/tasksView';
import * as helpers from './helpers.js';
import addTaskView from './views/addTaskView';



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



// const controlEditList = function(id) {
//     console.log(id);
// }
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

    tasksView.addHandlerCheckedTask(controlCheckedTask);
    tasksView.addHandlerActivateTask(controlActivateTask);
}
init();