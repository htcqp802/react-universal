import syncHistoryWithStore from './sync';
import { LOCATION_CHANGE, routerReducer } from './reducer'

import {
  CALL_HISTORY_METHOD,
  push, replace, go, goBack, goForward,
  routerActions
} from './actions'
import routerMiddleware from './middleware'


exports.CALL_HISTORY_METHOD = CALL_HISTORY_METHOD;
exports.push = push;
exports.replace = replace;
exports.go = go;
exports.goBack = goBack;
exports.goForward = goForward;
exports.routerActions = routerActions;
exports.LOCATION_CHANGE = LOCATION_CHANGE;
exports.routerReducer = routerReducer;
exports.syncHistoryWithStore = syncHistoryWithStore;
exports.routerMiddleware = routerMiddleware;