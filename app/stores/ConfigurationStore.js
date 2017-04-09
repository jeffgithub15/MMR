import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

import PomodoroConfig from '../constants/pomodoroConfiguration';

class ConfigurationStore extends EventEmitter {
    constructor() {
        super();
        let configs = JSON.parse(localStorage.getItem('configurations'))
        if (configs == undefined) {
            configs = [
                { id: PomodoroConfig.SHORT_BREAK, name: 'Short Break', durationInMinutes: 10 },
                { id: PomodoroConfig.LONG_BREAK, name: 'Long Break', durationInMinutes: 15 },
                { id: PomodoroConfig.POMODORO, name: 'Pomodoro', durationInMinutes: 25 },
                { id: 4, name: '25 Minutes', durationInMinutes: 25 },
                { id: 5, name: '30 Minutes', durationInMinutes: 30 },
                { id: 6, name: '35 Minutes', durationInMinutes: 35 },
                { id: 7, name: '40 Minutes', durationInMinutes: 40 }];
            localStorage.setItem("configurations", JSON.stringify(configs));
        }
        this._state = {
            isLoading: false,
            configs: configs
        }
    }

    getConfigurations() {
        return this._state.configs;
    };
    getConfigurationById(id) {
        return _.find(this._state.configs, function (i) {
            return i.id == id
        });
    }
    handleAction(action) {
        console.log("action", action.type);
    }
}

const configurationStore = new ConfigurationStore();
configurationStore.dispatchToken = Dispatcher.register(configurationStore.handleAction.bind(configurationStore));

window.Dispatcher = Dispatcher;
export default configurationStore;


