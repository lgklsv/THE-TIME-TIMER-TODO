import View from "./View";
import arrive from 'arrive';


class TimerView extends View {
    _parentElement = document.querySelector('.timer-btns-bottom');
    _startBtn = document.querySelector('.start-btn');
    _resetBtn = document.querySelector('#reset-button');


    _addHandlerStartTimer(handler) {
        this._parentElement.addEventListener('click', function(e) {
            console.log(e.target);
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
        this._parentElement.addEventListener('click', function(e) {
            if(e.target.parentElement.classList.contains('pause-btn')) {
                document.querySelector('.pause-btn').classList.toggle('really-hidden');
                document.querySelector('.start-btn').classList.toggle('really-hidden');
                handler();
            }
        })
    }
}

export default new TimerView();