import View from "./View";
import { state as state } from '../model';
import { audiosArr as audiosArr } from '../model';

class SettingsView extends View {
    _parentElement = document.querySelector('.upload-settings');
    _window = document.querySelector('.add-settings-window');
    _overlay = document.querySelector('.settings-overlay');
    _btnOpen = document.querySelector('.fa-gear');
    _btnClose = document.querySelector('.cancel-settings-btn');
    _btnSubmit = document.querySelector('.submit-settings-btn');
    _pomodoroInput = document.getElementById('pomodoro-input');
    _shortBreakInput = document.getElementById('shortbreak-input');
    _longBreakInput = document.getElementById('longbreak-input');
    _volumeInput = document.getElementById('timer-volume');
    _curVolumeIndic = document.querySelector('.timer-volume__cur');
    _selectVolumeInput = document.getElementById('timer-sound');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
        this._addHanderInputControls();
        this._addHandlerVolume();
        this._addHandlerChangeSound();
    }

    toggleWindow(e) {
        this._btnOpen.classList.add('rotate');
        setTimeout(() => this._btnOpen.classList.remove('rotate'), 500);
        if(e.target.classList.contains('fa-gear')) {
            this._pomodoroInput.value = state.pomodoro / 60;
            this._shortBreakInput.value = state.shortBreak / 60;
            this._longBreakInput.value = state.longBreak / 60;
            this._selectVolumeInput.value = state.audios.indexOf(state.completeAudio);
        } 
        this._window.classList.toggle('active');
        this._overlay.classList.toggle('hidden');
        
        setTimeout(() => this._pomodoroInput.focus(), 100);
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
        this._btnSubmit.addEventListener('click', this.toggleWindow.bind(this));
    }

    validateInput(input, e) {
        if (e.keyCode == 189) {
            input.value = '';
        }
    }

    _addHanderInputControls() {
        const pomInput = this._pomodoroInput;
        const shortInput = this._shortBreakInput;
        const longInput = this._longBreakInput;
        this._pomodoroInput.addEventListener('keyup', this.validateInput.bind(this, pomInput));
        this._shortBreakInput.addEventListener('keyup', this.validateInput.bind(this, shortInput));
        this._longBreakInput.addEventListener('keyup', this.validateInput.bind(this, longInput));
    }

    showVolumeChange(e) {
        let curVolumeValue = e.target.value;
        this._curVolumeIndic.textContent = curVolumeValue;
        
        audiosArr[state.completeAudio].volume = curVolumeValue / 100;
        audiosArr[state.completeAudio].play();
    }

    _addHandlerVolume() {
        this._volumeInput.addEventListener('input', this.showVolumeChange.bind(this));
    }

    _addHandlerChangeSound() {
        this._selectVolumeInput.addEventListener('change', function(e) {
            let sound = e.target.value;
            if(!audiosArr[state.audios[+sound]]) return;
            state.completeAudio = state.audios[+sound];
            audiosArr[state.completeAudio].play();
        })
    }

    _addHandlerUploadSettings(handler) {
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);

            let seconds = document.querySelector('.seconds');
            let minutes = document.querySelector('.minutes');
            let indicator = document.querySelector('.indicator');
            document.querySelector('.pause-btn').classList.add('really-hidden');
            document.querySelector('.start-btn').classList.remove('really-hidden');
            if(!data.pomodoro) return;
            if(!data.shortBreak) return;
            if(!data.longBreak) return;
            if(!data.sound) return;
            if(!data.volume) return;
            handler(data, seconds, minutes, indicator);
        })
    }
}

export default new SettingsView();