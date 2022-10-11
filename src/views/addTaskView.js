import View from "./View";

class AddTaskView extends View {
    _parentElement = document.querySelector('.uploadTask');
    _window = document.querySelector('.add-task-window');
    _overlay = document.querySelector('.taskOverlay');
    _btnOpen = document.querySelector('#addTaskBtn');
    _btnClose = document.querySelector('.cancel-addTask-btn');
    _inputField = document.querySelector('#task-name-input');
    _subinputField = document.querySelector('#task-subName-input');
    _estPomInputField = document.querySelector('.est-pom-input');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
        this._addHanderInputControls();
    }

    toggleWindow() {
        this._window.classList.toggle('active');
        this._overlay.classList.toggle('hidden');
        this._inputField.value = '';
        this._subinputField.value = '';
        setTimeout(() => this._inputField.focus(), 100);
    }

    controlEstPomInput(e) {
        if (e.target.classList.contains('control-up')) {
            this._estPomInputField.value++;
        } else if (e.target.classList.contains('control-down') &&  this._estPomInputField.value > 0) {
            this._estPomInputField.value--;
        }
    }

    validateEstInput(e) {
        if (e.keyCode == 189) {
            this._estPomInputField.value = '';
        }
    }

    _addHanderInputControls() {
        this._window.addEventListener('click', this.controlEstPomInput.bind(this));
        this._estPomInputField.addEventListener('keyup', this.validateEstInput.bind(this));
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
