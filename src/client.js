require('babel-polyfill');
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

/**
 * 由于IE8这里不能使用import否则会在require之前编译
 *
 // import React from 'react';
 // import ReactDOM from 'react-dom';
 // import createStore from './redux/create';
 // import ApiClient from './helpers/ApiClient';
 // import {Provider} from 'react-redux';
 // import {Router, browserHistory} from 'react-router';
 // import {syncHistoryWithStore} from 'react-router-redux';
 // import {ReduxAsyncConnect} from 'redux-async-connect';
 // // import useScroll from 'scroll-behavior/lib/useStandardScroll';
 // import io from 'socket.io-client';
 //
 // import getRoutes from './routes';
 **/



const React = require('react');
const ReactDOM = require('react-dom');
const createStore = require('./redux/create');
const ApiClient = require('./helpers/ApiClient');
const Provider = require('react-redux').Provider;
const Router = require('react-router').Router;
let browserHistory;
if ('pushState' in window.history) {
    browserHistory = require('react-router').browserHistory;
} else {
    browserHistory = require('react-router').hashHistory;
}

const syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
const ReduxAsyncConnect = require('redux-async-connect').ReduxAsyncConnect;
const useScroll = require('scroll-behavior').useStandardScroll;
const getRoutes = require('./routes');


const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);


if (__DEVELOPMENT__) {
    const io = require('socket.io-client');

    function initSocket() {
        const socket = io('', {path: '/ws'});
        return socket;
    }

    global.socket = initSocket();
}


const component = (
    <Router render={(props) =>
    <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />
  } history={history}>
        {getRoutes(store)}
    </Router>
);

ReactDOM.render(
    <Provider store={store} key="provider">
        {component}
    </Provider>,
    dest
);
if (process.env.NODE_ENV !== 'production') {
    window.React = React;
    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
        console.error('两端结构差异');
    }
}
if (__DEVTOOLS__ && !window.devToolsExtension) {
    const DevTools = require('./containers/DevTools/DevTools');
    ReactDOM.render(
        <Provider store={store} key="provider">
            <div>
                {component}
                <DevTools />
            </div>
        </Provider>,
        dest
    );
}


