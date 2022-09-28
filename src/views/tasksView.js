import View from "./View";

class TasksView extends View {
    _parentElement = document.querySelector('.tasks-container');
    _listTitle = document.querySelector('.list-title');
    _listLength = document.querySelector('.list-length');

    _generateMarkup() {
        return this._data.map(task => previewListView.render(task, false)).join('');
    }


}

export default new TasksView();