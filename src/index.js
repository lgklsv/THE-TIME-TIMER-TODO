import './styles/main.scss';

console.log('hello wrld');

const toggleSwitch = document.querySelector('#themeSwither');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    } 
};

toggleSwitch.addEventListener('change', switchTheme, false);
