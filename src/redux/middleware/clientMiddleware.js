export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }
      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      const actionPromise = promise(client);
      // actionPromise.then(
      //     (result) => {
      //       next({...rest, result, type: SUCCESS})
      //     },
      //     (error) => {
      //       console.log({...rest, error, type: FAILURE});
      //       next({...rest, error, type: FAILURE})
      //     }
      // ).catch((error)=> {
      //   console.error('中间件错误:', error);
      //   next({...rest, error, type: FAILURE});
      // });
      actionPromise
          .then(result=>next({...rest, result, type: SUCCESS}))
          .catch(error=>next({...rest, error, type: FAILURE}))
      return actionPromise;
    };
  };
}
