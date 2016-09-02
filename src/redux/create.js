import {createStore as _createStore, applyMiddleware,compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createMiddleware from './middleware/clientMiddleware';

export default function createStore(history, client, data) {
    //将路由actions 同步到history
    const reduxRouterMiddleware = routerMiddleware(history);
    const middleware = [createMiddleware(client), reduxRouterMiddleware];
    let finalCreateStore;

    //开发环境客户端引用devtools
    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
        const {persistState} = require('redux-devtools');
        const DevTools = require('../containers/DevTools/DevTools');
        finalCreateStore = compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(_createStore);
    } else {
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }
    const reducer = require('redux/modules/reducer');
    //createStore接受3个参数 1.reducer(means to do something) 2.初始化数据(e.g. session)
    //第三个参数就是中间件,就是上面的applyMiddleware
    const store = finalCreateStore(reducer, data);

    //webpack代码热替换
    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./modules/reducer', () => {
            store.replaceReducer(require('./modules/reducer'));
        });
    }
    return store;
}
