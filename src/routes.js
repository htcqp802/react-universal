import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {load as loadAuth, isLoaded as isAuthLoaded} from 'redux/modules/auth';
import {domains} from 'config';
import {
    App,
    Home,
    NotFound,
    ApplyLoan,
    ApplyFQD,
    fjdDetail,
    fqdDetail
} from 'containers';
import base64url from 'base64-url';

export default (store, res)=> {
    const requireLogin = (nextState, replace, cb) => {
        function checkAuth() {
            const {auth:{user}} = store.getState();
            if (!user) {
                const nextUrl = `${domains.lld}${nextState.location.pathname}`;
                const redirect = `${domains.my}/login?redirect=${encodeURIComponent(base64url.encode(nextUrl))}`;
                if (__SERVER__) {
                    res.redirect(redirect)
                }
                if (__CLIENT__) {
                    window.location.href = redirect;
                }
            }
            cb();
        }

        if (!isAuthLoaded(store.getState())) {
            store.dispatch(loadAuth()).then(checkAuth).catch(checkAuth);
        } else {
            checkAuth();
        }
    };

    return (
        <Route>
            <Route path="/" component={App}>
                <IndexRoute component={Home}></IndexRoute>
                <Route onEnter={requireLogin}>
                    <Route path="applyloan" component={ApplyLoan}></Route>
                    <Route path="applyfqd" component={ApplyFQD}></Route>
                </Route>
                <Route path="fjdDetail" component={fjdDetail}></Route>
                <Route path="fqdDetail" component={fqdDetail}></Route>
            </Route>
            <Route path="*" component={NotFound} status={404}/>
        </Route>
    )
}

