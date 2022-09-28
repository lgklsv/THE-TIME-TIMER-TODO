import View from "./View";

class PreviewListView extends View {
    _parentElement = '';

    _generateMarkup() {
        return ` 
            <div class="list" id="${this._data.id}">
                <p class="list-title">${this._data.listName}</p>
                <p class="task-counter">${this._data.tasks.length}</p>
            </div>
        `;
    }
}

export default new PreviewListView();