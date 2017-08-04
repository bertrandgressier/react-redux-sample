import 'rxjs';

import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'loaders.css/loaders.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import {rootEpic, rootReducer} from './rootConfiguration';

import {App} from './root/app.component';

const history = createHistory();
const routerMiddlewareInstance = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = composeEnhancers(
  applyMiddleware(createEpicMiddleware(rootEpic), routerMiddlewareInstance)
);

let store = createStore(rootReducer, epicMiddleware);

const Index = () => (
  <Provider store={store}>
    <App history={history}/>
  </Provider>
);

ReactDOM.render(<Index/>, document.getElementById('root'));
registerServiceWorker();
