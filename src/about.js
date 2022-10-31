import './styles/main.scss';
import menuView from './views/menuView';

const overlay = document.querySelector('.transparentOverlay');


const themeState = {
    theme: 'light',
    themes: ['dark', 'light', 'vscode', 'oneDark', 'playingCards', 'purple', 'coffee', 'strawberry'],
}

const persistThemes = function() {
    localStorage.setItem('theme', JSON.stringify(themeState.theme));
    localStorage.setItem('themes', JSON.stringify(themeState.themes));
}

const controlThemeSwitch = function() {
    menuView.render(themeState.themes);
}

const controlChangeTheme = function(theme) {
    themeState.theme = theme;
    persistThemes();
}

const init = function() {
    const storage = localStorage.getItem('theme');
    console.log(storage);
    if(storage)  {
        themeState.theme = JSON.parse(storage);
        console.log(themeState.theme);
    }
    const storage2 = localStorage.getItem('themes');
    if(storage)  {
        themeState.themes = JSON.parse(storage2);
    }
    document.documentElement.setAttribute('data-theme', themeState.theme);

    menuView._addHandlerShowThemes(controlThemeSwitch);
    menuView._addHandlerChangeTheme(controlChangeTheme)
}
init();


overlay.addEventListener('click', function(e) {
    e.target.classList.add('hidden');
    document.querySelector('.dropdown-themes').classList.add('hidden');
})
