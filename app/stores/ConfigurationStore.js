import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

class ConfigurationStore extends EventEmitter {
    constructor() {
        super();
        let configs = JSON.parse(localStorage.getItem('configurations'))
        if (configs == undefined) {
            configs = [
                { id: 1, name: '10 Minutes', durationInMinutes: 10 },
                { id: 2, name: '15 Minutes', durationInMinutes: 15 },
                { id: 3, name: '20 Minutes', durationInMinutes: 20 },
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


