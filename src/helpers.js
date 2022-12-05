export const formatFromCamel = function(name) {
    let formatedName = name.replace(/([A-Z])/g, ' $1');
    formatedName = formatedName.toLowerCase();
    formatedName = formatedName[0].toUpperCase() + formatedName.slice(1);
    return formatedName;
}

export const activateTimerBtn = function(btn) {
    Array.from(btn.parentElement.children).forEach(el => {
        el.classList.remove('active-timer-btn');
    });
    btn.classList.add('active-timer-btn');
}

export const toggleLoginModal = function(modal) {
    if(modal === 'login') {
        document.querySelector('.login').classList.toggle('active');
        document.querySelector('.loginOverlay').classList.toggle('hidden');
    }
    else if (modal === 'logout') {
        document.querySelector('.logout').classList.toggle('active');
        document.querySelector('.logoutOverlay').classList.toggle('hidden');
    }
}