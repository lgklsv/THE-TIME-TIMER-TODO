import './styles/main.scss';

console.log('hello wrld');

const toggleSwitch = document.querySelector('#themeSwither');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'coffee');
    } 
};

toggleSwitch.addEventListener('change', switchTheme, false);


const taskBox = document.querySelector('.tasks-container');

taskBox.addEventListener('change', changeText);
function changeText(e)  {
    if(e.target.checked) {
        e.target.parentElement.nextElementSibling.firstElementChild.firstElementChild.classList.add('task-title-checked');
    }
    else {
        e.target.parentElement.nextElementSibling.firstElementChild.firstElementChild.classList.remove('task-title-checked');
    }
    e.stopPropagation();
}