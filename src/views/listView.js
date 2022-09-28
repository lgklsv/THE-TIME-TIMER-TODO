import View from "./View";
import previewListView from "./previewListView";

class ListView extends View {
    _parentElement = document.querySelector('.lists-container');

    addHandlerRenderTasks(handler) {
        this._parentElement.addEventListener('click', function(e) {
            if (e.target.classList == "list-title") {
                handler(e.target.closest('.list').id);
            }
        })
    }

    _generateMarkup() {
        return this._data.map(list => previewListView.render(list, false)).join('');
    }
}

export default new ListView();