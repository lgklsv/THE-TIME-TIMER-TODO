import View from "./View";

class TimerView extends View {
    _parentElementBottom = document.querySelector('.timer-btns-bottom');
    _startBtn = document.querySelector('.start-btn');
    _resetBtn = document.querySelector('#reset-button');
    _parentElementTop = document.querySelector('.timer-btns-top');


    _addHandlerChangeMode(handler) {
        this._parentElementTop.addEventListener('click', function(e) {

            function activateCurEl(e) {
                Array.from(e.target.parentElement.children).forEach(el => {
                    el.classList.remove('active-timer-btn');
                });
                e.target.classList.add('active-timer-btn');
            }
            let seconds = document.querySelector('.seconds');
            let minutes = document.querySelector('.minutes');
            let indicator = document.querySelector('.indicator');
            console.log(e.target);
            document.querySelector('.pause-btn').classList.add('really-hidden');
            document.querySelector('.start-btn').classList.remove('really-hidden');
            if(e.target.id == 'pomodoro') {
                activateCurEl(e);
                handler(e.target.id, seconds, minutes, indicator);
            }
            if(e.target.id == 'short-break') {
                activateCurEl(e);
                handler(e.target.id, seconds, minutes, indicator);
            }
            if(e.target.id == 'long-break') {
                activateCurEl(e);
                handler(e.target.id, seconds, minutes, indicator);
            }
        })
    }

    _addHandlerStartTimer(handler) {
        this._parentElementBottom.addEventListener('click', function(e) {
            if(e.target.parentElement.classList.contains('start-btn')) {
                e.target.parentElement.classList.toggle('really-hidden');
                document.querySelector('.pause-btn').classList.toggle('really-hidden');
                let seconds = document.querySelector('.seconds');
                let minutes = document.querySelector('.minutes');
                let indicator = document.querySelector('.indicator');
                handler(seconds, minutes, indicator);
            }
        })
    }

    _addHandlerResetTimer(handler) {
        this._resetBtn.addEventListener('click', function(e) {
            document.querySelector('.pause-btn').classList.add('really-hidden');
            document.querySelector('.start-btn').classList.remove('really-hidden');
            
            e.target.classList.add('rotate');
            let seconds = document.querySelector('.seconds');
            let minutes = document.querySelector('.minutes');
            let indicator = document.querySelector('.indicator');
            handler(seconds, minutes, indicator);
            setTimeout(function(){
                e.target.classList.remove('rotate');
            }, 500);
        })
    }

    _addHandlerPauseTimer(handler) {
        this._parentElementBottom.addEventListener('click', function(e) {
            if(e.target.parentElement.classList.contains('pause-btn')) {
                document.querySelector('.pause-btn').classList.toggle('really-hidden');
                document.querySelector('.start-btn').classList.toggle('really-hidden');
                handler();
            }
        })
    }
}

export default new TimerView();