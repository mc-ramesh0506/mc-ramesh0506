import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../src/reducers/reducer';
import './index.css';
import Routing from "./router/Routing";
import * as serviceWorker from './serviceWorker';
import { loadState, saveState } from './store/localStore';

let persistedState = loadState();

const store = createStore(reducer, persistedState);

store.subscribe(() => saveState(store.getState()))

ReactDOM.render(<Provider store={store}><Routing /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
