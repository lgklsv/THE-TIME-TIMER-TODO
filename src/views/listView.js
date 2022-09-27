import View from "./View";

class ListView extends View {
    _parentElement = document.querySelector('.lists-container');

    _generateMarkup() {
        return ` 
            <div class="list">
                <p class="list-title">${this._data.listName}</p>
                <p class="task-counter">0</p>
            </div>
        `;
    }
}

export default new ListView();