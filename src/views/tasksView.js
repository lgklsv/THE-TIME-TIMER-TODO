import View from "./View";
import arrive from 'arrive';

class TasksView extends View {
    _parentElement = document.querySelector('.tasks-container');
    _listTitle = document.querySelector('.list-title');
    _listLength = document.querySelector('.list-length');
    _completedCounter = document.querySelector('.tasks-comleted_counter');
    _deleteCompletedBtn = document.querySelector('.tasks-comleted_btn');
    constructor() {
        super();
        this._addHandlerShowEditInput();
    }

    addHandlerActivateTask(handler) {
        this._parentElement.addEventListener('click', function(e) {
            if (e.target.classList.contains('task-title')) {
                handler(e.target.closest('.task').id);
            }
        })
    }

    addHandlerCheckedTask(handler) {
        this._parentElement.addEventListener('change', function(e) {
            if(e.target.type == 'checkbox') {
                e.target.checked 
                ? handler(e.target.parentElement.parentElement.id, true) 
                : handler(e.target.parentElement.parentElement.id, false); 
            }
        })
    }

    showEditTaskInput(e) {
        if (e.target.classList.contains('edit-task')) {
            const parentTask = e.target.closest('.task');
            parentTask.outerHTML = this._generateMarkupEditTask(parentTask);

            const input = document.querySelector('.edit-task-input_active') ? document.querySelector('.edit-task-input_active') : document.querySelector('.edit-task-input');
            const end = input.value.length;
            input.setSelectionRange(end, end);
            input.focus();
        }
    }

    _addHandlerEditTask(handler) {
        this._parentElement.arrive('.formUpTask', function(){
            const curTaskID = this.parentElement.parentElement.id;
            const input = document.querySelector('.edit-est-pom-input_active') ? document.querySelector('.edit-est-pom-input_active') : document.querySelector('.edit-est-pom-input');

            input.addEventListener('keyup', function(e) {
                if (e.keyCode == 189) {
                    input.value = '';
                }
            })

            this.addEventListener('submit', function(e) {
                e.preventDefault();
                const dataArr = [...new FormData(e.target)];
                const data = Object.fromEntries(dataArr);
                data.id = curTaskID;
                
                if(!data.editedTaskValue) return;
                if(!data.estPom) return;

                handler(data);
            })
        })
    }

    _addHandlerShowEditInput() {
        this._parentElement.addEventListener('click', this.showEditTaskInput.bind(this));
    }

    _addHandlerDeleteTask(handler) {
        this._parentElement.addEventListener('click', function(e) {
            if(e.target.classList.contains('delete-task')) {
                handler(e.target.closest('.task').id);
            }
        })
    }

    _addHandlerDeleteAllCompleted(handler) {
        this._deleteCompletedBtn.addEventListener('click', function(e) {
            console.log(e.target);
            handler();

        })
    }
 
    _generateMarkup() {
        this._listTitle.textContent = this._data.listName;
        this._listLength.textContent = this._data.tasks.length;
        this._completedCounter.textContent = this._data.completed;
        return `
            ${this._data.tasks ? `${this._data.tasks
                .map(this._generateMarkupTask)
                .join('')}` : ''}
        `;
    }

    _generateMarkupEditTask(parentTask) {
        return `
        <div class="edit-task_mod task${parentTask.classList.contains('active-task') ? ' active-task' : ''}" id="${parentTask.id}">
            <div class="task-grid task-grid_mod">
                <form class="formUpTask" novalidate>
                    <div class="task-desc">
                        <input name="editedTaskValue" type="text" value="${parentTask.lastElementChild.firstElementChild.firstElementChild.innerHTML}" class="edit-task-input${parentTask.classList.contains('active-task') ? '_active' : ''}">
                        <input name="editedTaskSubtitleValue" type="text" value="${parentTask.lastElementChild.firstElementChild.lastElementChild.innerHTML}" class="edit-task-Subtitle-input${parentTask.classList.contains('active-task') ? '_active' : ''}">
                    </div>
                    <input type="number" value="${parentTask.lastElementChild.firstElementChild.nextElementSibling.innerHTML.split('/')[1]}" min="0" class="edit-est-pom-input${parentTask.classList.contains('active-task') ? '_active' : ''}" name="estPom">
                    <input type="submit" value="" class="hidden-submit whole-screen-submit">
                    <button type="submit" id="confirm-edit-task" class="task-settigs text-btn icon">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </button>
                </form>
                <div id="delete-task_mod" class="task-settigs text-btn icon delete-task">
                    <i class="far fa-trash-alt"></i>
                </div>
            </div>
        </div>
        `;
    }

    _generateMarkupTask(task) {
        return `
            <div class="task${task.active ? ' active-task' : ''}" id="${task.id}">
                <label class="checkbox" for="taskCheckbox${task.id}">
                    <input ${task.checked ? 'checked' : ''}
                        class="checkbox-input"
                        type="checkbox"
                        name="taskCheckboxName"
                        id="taskCheckbox${task.id}"
                    />
                <div class="checkbox-box ${task.active ? 'checkbox-box-active' : ''}"></div>
                </label>
                <div class="task-grid">
                    <div class="task-desc">
                        <p class="task-title${task.checked ? ' task-title-checked' : ''}">${task.taskName}</p>
                        <p class="task-subtitle">${task.subName}</p>
                    </div>
                    <div class="task-counter">${task.completedPom}/${task.estPom}</div>
                    <div class="task-settigs text-btn icon edit-task">
                        <i class="far fa-edit"></i>
                    </div>
                    <div class="task-settigs text-btn icon delete-task">
                        <i class="far fa-trash-alt"></i>
                    </div>
                </div>
            </div>
        `;
    }
}

export default new TasksView();