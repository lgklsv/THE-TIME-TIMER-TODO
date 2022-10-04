import View from "./View";

class PreviewListView extends View {
    _parentElement = '';

    _generateMarkup() {
        return ` 
            <div class="list ${this._data.active ? 'list-active' : ''}" id="${this._data.id}">
                <p class="list-title">${this._data.listName}</p>
                <div class="list-settigs text-btn icon">
                    <div class="list-settings-icon">
                        <i class="fa-solid fa-circle-info"></i> 
                    </div>
                    <p class="task-counter">${this._data.tasks.length}</p>
                </div>
            </div>
        `;
    }
}

export default new PreviewListView();