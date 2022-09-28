import View from "./View";

class TasksView extends View {
    _parentElement = document.querySelector('.task-section');
    // _listTitle = document.querySelector('.list-title');
    // _listLength = document.querySelector('.list-length');


    _generateMarkup() {
        return `
        <div class="tasks-lists-section-header">
          <h2 class="tasks-lists-title list-title">${this._data.listName}</h2>
          <h2 class="tasks-lists-title list-length">${this._data.tasks.length}</h2>
        </div>
        <div class="tasks-container">
            <div class="task">
                <label class="checkbox" for="taskCheckbox1">
                    <input
                        class="checkbox-input"
                        type="checkbox"
                        name="taskCheckboxName"
                        id="taskCheckbox1"
                    />
                <div class="checkbox-box"></div>
                </label>
                <div class="task-grid">
                    <div class="task-desc">
                        <p class="task-title">TEST TASK</p>
                    </div>
                    <div class="task-counter">0/3</div>
                    <div class="task-settigs text-btn icon">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="add-new-task-list-container">
          <button>+ Add Task</button>
        </div>
      </div>
        `
        // return this._data.map(task => previewListView.render(task, false)).join('');
    }

    // _generateMarkupTask(task) {
    //     return `
    //         <div class="task">
    //             <label class="checkbox" for="taskCheckbox1">
    //                 <input
    //                     class="checkbox-input"
    //                     type="checkbox"
    //                     name="taskCheckboxName"
    //                     id="taskCheckbox1"
    //                 />
    //             <div class="checkbox-box"></div>
    //             </label>
    //             <div class="task-grid">
    //                 <div class="task-desc">
    //                     <p class="task-title">TEST TASK</p>
    //                 </div>
    //                 <div class="task-counter">0/3</div>
    //                 <div class="task-settigs text-btn icon">
    //                     <i class="fa-solid fa-ellipsis-vertical"></i>
    //                 </div>
    //             </div>
    //         </div>
    //     `;
    // }
}

export default new TasksView();

// ${this._data.tasks
//     .map(this._generateMarkupTask)
//     .join('')}