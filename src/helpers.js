

// //////////////////////////////////////////////////////////
// Theme switcher
const toggleSwitch = document.querySelector('#themeSwitcher');
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'vscode');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'playingCards');
    } 
};
toggleSwitch.addEventListener('change', switchTheme, false);


// //////////////////////////////////////////////////////////
// Timer progress bar
const circle = document.querySelector('.progressbar-ring-circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const inputTest = document.querySelector('.percent-test');
const resetBtn = document.querySelector('#reset-button');

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

//Init setting
setProgress(100);

inputTest.addEventListener('change', function() {
    setProgress(inputTest.value);
})
resetBtn.addEventListener('click', function() {
    resetBtn.classList.add('rotate');
    inputTest.value = 100;
    setProgress(100);
    setTimeout(function(){
        resetBtn.classList.remove('rotate');
    }, 500);
})