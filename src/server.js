import Express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import compression from 'compression';
import favicon from 'serve-favicon';
import config from 'config';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';
import createHistory from 'react-router/lib/createMemoryHistory';
import {match} from 'react-router';
import getRoutes from './routes';
import createStore from './redux/create';
import {syncHistoryWithStore} from 'react-router-redux';
import {ReduxAsyncConnect, loadOnServer} from 'redux-async-connect';
import {Provider} from 'react-redux';
import ApiClient from './helpers/ApiClient';
import SocketIo from 'socket.io';
import cookieParser from 'cookie-parser';


const app = new Express();
const server = new http.Server(app);
const targetUrl = config.api.host + ':' + config.api.port;


/**
 * 配置代理
 * ws 是否使用websocket
 */
const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: false
});

app.use(cookieParser());
//启用文件压缩
app.use(compression());
//配置ico
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));
//配置静态文件
app.use(Express.static(path.join(__dirname, '..', 'dist')));
//配置代理地址
app.use((req, res, next) => {
    if (req.url.indexOf('/api/v2') > -1 || req.url.indexOf('/so/api/v2') > -1) {
        proxy.web(req, res)
    } else {
        next();
    }
});


proxy.on('error', (error, req, res) => {
    let json;
    if (error.code !== 'ECONNRESET') {
        console.error('proxy error', error);
    }
    if (!res.headersSent) {
        res.writeHead(500, {'content-type': 'application/json'});
    }


    json = {error: 'proxy_error', reason: error.message};
    res.end(JSON.stringify(json));
});



/**
 * 渲染页面
 */
app.use((req, res)=> {

    if (__DEVELOPMENT__) {
        webpackIsomorphicTools.refresh();
    }

    //挂在请求方法
    const client = new ApiClient(req);
    //创建react-router核心对象history
    const memoryHistory = createHistory(req.originalUrl);
    //创建store
    const store = createStore(memoryHistory, client);
    //增强history
    const history = syncHistoryWithStore(memoryHistory, store);

    //react-router 服务器端渲染
    match({
        history,
        routes: getRoutes(store, res),
        location: req.originalUrl
    }, (error, redirectLocation, renderProps)=> {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            //调用缓存
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
                const component = (
                    <Provider store={store} key="provider">
                        <ReduxAsyncConnect {...renderProps} />
                    </Provider>
                );
                res.status(200);
                res.send('<!doctype html>\n' +
                    ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component}
                                                  store={store}/>));
            });
        } else {
            res.status(404).send('页面没有找到');
        }
    })

});


/**
 * 启动服务
 */
const runnable = app.listen(config.web.port, (err) => {
    if (err) {
        console.error(err);
    }
    console.info('----\n==> ✅  %s 已经启动,api地址 %s.', config.app.title, targetUrl);
    console.info('==> 💻  node地址 http://%s:%s', config.web.host, config.web.port);
});
if (__DEVELOPMENT__) {
    const io = new SocketIo(server);
    io.path('/ws');
//启用socket
    io.on('connection', (socket) => {
    });
    io.listen(runnable);

}

