import View from "./View";
import * as helpers from '../helpers.js';
import arrive from 'arrive';

class MenuView extends View {
    _parentElement = document.querySelector('.dropdown-themes');
    _menuList = document.querySelector('.menu-list');
    _overlayLogin = document.querySelector('.loginOverlay');
    _overlayLogout = document.querySelector('.logoutOverlay');
    _loginEl = document.querySelector('.login');
    _logoutBtnClose = document.querySelector('.logout__cancelBtn');

    constructor() {
        super();
        this._addHandlerHideLogin();
        this._addHandlerHideLogout();
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
            if(e.target.classList.contains('signInBtn_login')) {
                helpers.toggleLoginModal('login');
                handler();
            }
        })
    }

    _addHandlerShowLogout(handler) {
        this._menuList.addEventListener('click', function(e) {
            if(e.target.classList.contains('signInBtn_logout')) {
                helpers.toggleLoginModal('logout');
                handler();
            }
        })
    }

    toggleLogin() {
        helpers.toggleLoginModal('login');
    }

    toggleLogout() {
        console.log('ji');
        helpers.toggleLoginModal('logout');
    }

    _addHandlerHideLogin() {
        this._overlayLogin.addEventListener('click', this.toggleLogin.bind(this));
    }

    _addHandlerHideLogout() {
        this._logoutBtnClose.addEventListener('click', this.toggleLogout.bind(this));
        this._overlayLogout.addEventListener('click', this.toggleLogout.bind(this));
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