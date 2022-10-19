// //////////////////////////////////////////////////////////
// Theme switcher
const toggleSwitch = document.querySelector('#themeSwitcher');
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'coffee');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'playingCards');
    } 
};
toggleSwitch.addEventListener('change', switchTheme, false);
