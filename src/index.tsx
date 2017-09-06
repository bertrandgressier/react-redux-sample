import 'rxjs';

import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'loaders.css/loaders.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { createBrowserHistory, History } from 'history';
import { routerMiddleware } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import { rootEpic, rootReducer } from './rootConfiguration';

import { App } from './root/app.component';
import { AppAction, ApplicationStore } from './root.type';

const history: History = createBrowserHistory();
const routerMiddlewareInstance: Middleware = routerMiddleware(history);

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const rootEpicMiddleware: Middleware = createEpicMiddleware<AppAction, ApplicationStore>(rootEpic);

const epicMiddleware = composeEnhancers(
    applyMiddleware(rootEpicMiddleware, routerMiddlewareInstance)
);

let store = createStore<ApplicationStore>(rootReducer, epicMiddleware);

const Index = () => (
    <Provider store={store}>
        <App history={history}/>
    </Provider>
);

ReactDOM.render(<Index/>, document.getElementById('root'));
registerServiceWorker();
