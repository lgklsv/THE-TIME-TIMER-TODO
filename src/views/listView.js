import View from "./View";
import previewListView from "./previewListView";

class ListView extends View {
    _parentElement = document.querySelector('.lists-container');
    _overlay = document.querySelector('.transparentOverlay');

    constructor() {
        super();
        this._addHandlerShowListSettings();
        this._addHandlerHideListSettings();
        this._addHanderShowEditInput();
    }

    addHandlerRenderTasks(handler) {
        this._parentElement.addEventListener('click', function(e) {
            if (e.target.classList == "list-title") {
                handler(e.target.closest('.list').id);
            }
        })
    }

    toggleListSettings(e) {
        if (e.target.classList.contains("settings-icon")) {
            e.target.parentElement.classList.toggle('opacityToggle');
            this._overlay.classList.toggle('hidden');
            e.target.parentElement.parentElement.nextElementSibling.classList.toggle('hidden');
        }
        else if (e.target.classList.contains('transparentOverlay') || e.target.classList.contains('edit-list')) {
            this._overlay.classList.toggle('hidden');
            const allListSettings = document.querySelectorAll('.dropdown-list-settings');
            const allSettingsIcons = document.querySelectorAll('.list-settings-icon');
            allListSettings.forEach(item => {
                if(!item.classList.contains('hidden')) {
                    item.classList.add('hidden');
                }
            });
            allSettingsIcons.forEach(item => {
                if(!item.classList.contains('opacityToggle')) {
                    item.classList.add('opacityToggle');
                }
            })
        }
    }

    showEditInput(e) {
        if(e.target.classList.contains('edit-list')) {
            const parentList = e.target.closest('.list');
            let prevValue = parentList.firstElementChild.innerHTML;

            parentList.firstElementChild.outerHTML = `
            <form class="formUp" novalidate>
                <input name="editedValue" type="text" value="${prevValue}" class="list-title edit-list-input${parentList.classList.contains('list-active') ? '_active' : ''}">
                <input type="submit" class="hidden-submit">
            </form>
            `;
            const input = parentList.firstElementChild.firstElementChild;
            const end = input.value.length;
            const editForm = parentList.firstElementChild;
            input.setSelectionRange(end, end);
            input.focus();
            // this._overlay.classList.toggle('hidden');
            this.toggleListSettings(e);

            this._overlay.addEventListener('click', function() {
                console.log(parentList);
            })

            
            editForm.addEventListener('submit', (e) => {

                e.preventDefault();
                console.log(e.target);
                const dataArr = [...new FormData(e.target)];
                const data = Object.fromEntries(dataArr);

                if(!data.editedValue) return;
                console.log(data);
            })
        }
    }

    _addHandlerEditList(handler) {

    }


    _addHandlerShowListSettings() {
        this._parentElement.addEventListener('click', this.toggleListSettings.bind(this));
    }

    _addHandlerHideListSettings() {
        this._overlay.addEventListener('click', this.toggleListSettings.bind(this));
    }

    _addHanderShowEditInput() {
        this._parentElement.addEventListener('click', this.showEditInput.bind(this));
    }

    _generateMarkup() {
        return this._data.map(list => previewListView.render(list, false)).join('');
    }
}

export default new ListView();