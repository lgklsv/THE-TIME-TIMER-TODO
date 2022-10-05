import View from "./View";
import previewListView from "./previewListView";

class ListView extends View {
    _parentElement = document.querySelector('.lists-container');

    addHandlerRenderTasks(handler) {
        this._parentElement.addEventListener('click', function(e) {
            if (e.target.classList == "list-title") {
                console.log(e.target);
                handler(e.target.closest('.list').id);
            }
            else if (e.target.classList.contains("settings-icon")) {
                console.log(e.target);
                e.target.parentElement.parentElement.nextElementSibling.classList.toggle('hidden');
            }
        })
    }

    _generateMarkup() {
        return this._data.map(list => previewListView.render(list, false)).join('');
    }
}

export default new ListView();