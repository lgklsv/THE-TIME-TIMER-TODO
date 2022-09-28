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
    // console.log(id);
    // console.log(model.loadTasks(id));
    tasksView.render(model.loadTasks(id));
    listView.update(model.state.lists);
    
}


const init = function() {
    addListView._addHandlerUploadNewList(controlAddLists);
    
    addTaskView._addHandlerUploadNewTask(controlAddTask);
    listView.addHandlerRenderTasks(controlRenderTasks);
}
init();