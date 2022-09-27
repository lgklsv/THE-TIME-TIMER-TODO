import View from "./View";
import previewListView from "./previewListView";

class ListView extends View {
    _parentElement = document.querySelector('.lists-container');

    _generateMarkup() {
        return this._data.map(list => previewListView.render(list, false)).join('');
    }
}

export default new ListView();