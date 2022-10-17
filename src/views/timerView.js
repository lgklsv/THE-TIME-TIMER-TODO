import View from "./View";
import arrive from 'arrive';


class TimerView extends View {
    _startBtn = document.querySelector('.start-stop-btn');
    _resetBtn = document.querySelector('.reset-button');


    _addHandlerStartTimer(handler) {
        this._startBtn.addEventListener('click', function() {
            let seconds = document.querySelector('.seconds');
            let minutes = document.querySelector('.minutes');
            let indicator = document.querySelector('.indicator');
            handler(seconds, minutes, indicator);
        })
    }
}

export default new TimerView();