import View from "./View";

class AddListView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-list-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('#addListBtn');
    _btnClose = document.querySelector('.cancel-btn');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._window.classList.toggle('active');
        this._overlay.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerUploadNewList(handler) {
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            // handler(data);
            console.log(data);
        })
    }
}

export default new AddListView();
