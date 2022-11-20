import View from "./View";
import * as helpers from '../helpers.js';
import arrive from 'arrive';

class MenuView extends View {
    _parentElement = document.querySelector('.dropdown-themes');
    _menuList = document.querySelector('.menu-list');
    _overlay = document.querySelector('.loginOverlay');
    _loginEl = document.querySelector('.login');

    constructor() {
        super();
        this._addHandlerHideLogin();
    }

    _addHandlerShowThemes(handler) {
        this._menuList.addEventListener('click', function(e) {
            if(e.target.classList.contains('fa-palette')) {
                document.querySelector('.dropdown-themes').classList.toggle('hidden');
                document.querySelector('.transparentOverlay').classList.toggle('hidden');
                handler();
            }
        })
    }

    _addHandlerShowLogin(handler) {
        this._menuList.addEventListener('click', function(e) {
            if(e.target.classList.contains('signInOut')) {
                document.querySelector('.login').classList.toggle('active');
                document.querySelector('.loginOverlay').classList.toggle('hidden');
                handler();
            }
        })
    }

    toggleLogin() {
        this._loginEl.classList.toggle('active');
        this._overlay.classList.toggle('hidden');
    }

    _addHandlerHideLogin() {
        this._overlay.addEventListener('click', this.toggleLogin.bind(this));
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