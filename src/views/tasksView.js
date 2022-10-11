import View from "./View";

class TasksView extends View {
    _parentElement = document.querySelector('.tasks-container');
    _listTitle = document.querySelector('.list-title');
    _listLength = document.querySelector('.list-length');

    addHandlerActivateTask(handler) {
        this._parentElement.addEventListener('click', function(e) {
            if (e.target.classList.contains('task-title')) {
                handler(e.target.closest('.task').id);
            }
        })
    }

    addHandlerCheckedTask(handler) {
        this._parentElement.addEventListener('change', function(e) {
            e.target.checked 
            ? handler(e.target.parentElement.parentElement.id, true) 
            : handler(e.target.parentElement.parentElement.id, false); 
        })
    }

    _generateMarkup() {
        this._listTitle.textContent = this._data.listName;
        this._listLength.textContent = this._data.tasks.length;
        return `
            ${this._data.tasks ? `${this._data.tasks
                .map(this._generateMarkupTask)
                .join('')}` : ''}
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
                    <div class="task-counter">0/${task.estPom}</div>
                    <div class="task-settigs text-btn icon">
                        <i class="far fa-edit"></i>
                    </div>
                    <div class="task-settigs text-btn icon">
                        <i class="far fa-trash-alt"></i>
                    </div>
                </div>
            </div>
        `;
    }
}

export default new TasksView();