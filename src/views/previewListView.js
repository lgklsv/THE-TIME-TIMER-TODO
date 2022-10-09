import View from "./View";

class PreviewListView extends View {
    _parentElement = '';

    _generateMarkup() {
        return ` 
            <div class="list ${this._data.active ? 'list-active' : ''}" id="${this._data.id}">
                <p class="list-title">${this._data.listName}</p>
                <div class="list-settings text-btn icon">
                    <div class="list-settings-icon opacityToggle">
                        <i class="fa-solid fa-circle-info settings-icon"></i>
                    </div>
                    <p class="task-counter">${this._data.tasks.length}</p>
                </div>
                <ul class="dropdown-list-settings hidden">
                    <li class="list-setting edit-list">Edit</li>
                    <li class="list-setting delete-list">Delete</li>
                </ul>
            </div>
        `;
    }
}

export default new PreviewListView();