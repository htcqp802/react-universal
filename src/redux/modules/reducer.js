import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';
import slider from './slider';
import applyLoan from './applyLoan';
import auth from './auth';
import userInfo from './userInfo';
import applyFQD from './applyFQD';

export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    form,
    auth,
    userInfo,
    slider,
    applyLoan,
    applyFQD
})
