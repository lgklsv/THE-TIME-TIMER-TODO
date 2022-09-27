import View from "./View";

class PreviewListView extends View {
    _parentElement = '';

    _generateMarkup() {
        return ` 
            <div class="list">
                <p class="list-title">${this._data.listName}</p>
                <p class="task-counter">0</p>
            </div>
        `;
    }
}

export default new PreviewListView();