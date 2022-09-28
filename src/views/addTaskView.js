import View from "./View";

class AddTaskView extends View {
    _parentElement = document.querySelector('.uploadTask');
    _window = document.querySelector('.add-task-window');
    _overlay = document.querySelector('.taskOverlay');
    _btnOpen = document.querySelector('#addTaskBtn');
    _btnClose = document.querySelector('.cancel-addTask-btn');
    _inputField = document.querySelector('#task-name-input');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._window.classList.toggle('active');
        this._overlay.classList.toggle('hidden');
        this._inputField.value = '';
        setTimeout(() => this._inputField.focus(), 100);
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerUploadNewTask(handler) {
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);

            if(!data.taskName) return;

            console.log(data);
            handler(data);
        })
    }
}

export default new AddTaskView();
