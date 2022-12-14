import View from "./View";
import previewListView from "./previewListView";
import arrive from 'arrive';

class ListView extends View {
    _parentElement = document.querySelector('.lists-container');
    _overlay = document.querySelector('.transparentOverlay');

    constructor() {
        super();
        this._addHandlerShowListSettings();
        this._addHandlerHideListSettings();
        this._addHandlerShowEditInput();
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
        else if (e.target.classList.contains('transparentOverlay') 
        || e.target.classList.contains('edit-list') 
        || e.target.classList.contains('delete-list')
        ){
            this._overlay.classList.toggle('hidden');
            document.querySelector('.dropdown-themes').classList.add('hidden');

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

    showEditListInput(e) {
        if(e.target.classList.contains('edit-list')) {
            const parentList = e.target.closest('.list');
            parentList.firstElementChild.outerHTML = this._generateMarkupEditListForm(parentList);

            const input = parentList.firstElementChild.firstElementChild;
            const end = input.value.length;
            input.setSelectionRange(end, end);
            input.focus();
            
            this._overlay.classList.toggle('hidden');
            this.toggleListSettings(e);
        }
    }

    _addHandlerEditList(handler) {
        this._parentElement.arrive('.formUpList', function(){

            const curListID = this.parentElement.id;

            this.addEventListener('submit', function(e) {
                e.preventDefault();
                const dataArr = [...new FormData(e.target)];
                const data = Object.fromEntries(dataArr);
                data.id = curListID;
                
                if(!data.editedListValue) return;
                handler(data);
            })
        })
    }

    _addHandlerDeleteList(handler) {
        this._parentElement.addEventListener('click', function(e) {
            if(e.target.classList.contains('delete-list')) {
                handler(e.target.closest('.list').id);
            }
        })
    }

    _addHandlerShowListSettings() {
        this._parentElement.addEventListener('click', this.toggleListSettings.bind(this));
    }

    _addHandlerHideListSettings() {
        this._overlay.addEventListener('click', this.toggleListSettings.bind(this));
    }

    _addHandlerShowEditInput() {
        this._parentElement.addEventListener('click', this.showEditListInput.bind(this));
    }

    _generateMarkup() {
        return this._data.map(list => previewListView.render(list, false)).join('');
    }

    _generateMarkupEditListForm(parentList) {
        return `
            <form class="formUpList" novalidate>
                <input name="editedListValue" type="text" value="${parentList.firstElementChild.innerHTML}" class="list-title edit-list-input${parentList.classList.contains('list-active') ? '_active' : ''}">
                <input type="submit" value="" class="hidden-submit whole-screen-submit">
            </form>
        `;
    }
}

export default new ListView();