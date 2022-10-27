import View from "./View";
import * as helpers from '../helpers.js';
import arrive from 'arrive';

class MenuView extends View {
    _parentElement = document.querySelector('.dropdown-themes');
    _menuList = document.querySelector('.menu-list');

    _addHandlerShowThemes(handler) {
        this._menuList.addEventListener('click', function(e) {
            if(e.target.classList.contains('fa-palette')) {
                document.querySelector('.dropdown-themes').classList.toggle('hidden');
                document.querySelector('.transparentOverlay').classList.toggle('hidden');
                handler();
            }
        })
    }

    _addHandlerChangeTheme(handler) {
        this._parentElement.arrive('.dropdown-container', function() {
            this.addEventListener('click', function(e) {
                if(e.target.classList.contains('theme-item')) {
                    const theme = e.target.dataset.pickTheme
                    document.documentElement.setAttribute('data-theme', theme);
                    handler(theme);
                }
            })
        })
    }

    _generateMarkup() {
        return `
            <div class="dropdown-container">
                ${this._data ? `${this._data
                .map(this._generatePreviewTheme)
                .join('')}` : ''}
            </div> 
        `;
    }

    _generatePreviewTheme(theme) {
        return ` 
            <li class="theme-item" data-pick-theme="${theme}">${helpers.formatFromCamel(theme)}</li>
        `;
    }
    
}

export default new MenuView();