import 'isomorphic-fetch';

export default store => next => action => {
  if (typeof action.type === 'undefined' || typeof action.url === 'undefined')
    return next(action);

  let state = store.getState();

  let [pendingType, successType, errorType] = action.type;

  let {
    url,
    method = 'get',
    contentType = 'application/json',
    query = {},
    data = {},
    options = {}
  } = action;

  let req = {
    ...options,
    headers: { 'Content-Type': contentType },
    method
  };

  let token = window.localStorage.getItem(ENV.AUTH_TOKEN);

  if (method.toLowerCase() === 'post') {
    req['body'] = JSON.stringify(data);
  }

  if (url.indexOf('://') < 0) {
    url = ENV.API_ROOT + url;
    if (token) {
      req.headers['Authorization'] = token;
    }
  }

  next({ type: pendingType });

  if (ENV.DEPLOY_TARGET === ENV.TARGET_DEV) {
    console.log('sending fetch', url, req);
  }

  fetch(url, req)
    .then(r => {
      if (r.status === 401) {
        window.localStorage.removeItem(ENV.AUTH_TOKEN);
          // TODO redirect to login here
      }
      if (!r.ok) {
        throw r;
      }
      if (r.ok && r.headers.has('Authorization')) {
        window.localStorage.setItem(ENV.AUTH_TOKEN, r.headers.get('Authorization') || '');
      }
      return r.text()
        .then(data => {
          try { return JSON.parse(data); }
          catch(e) { return data; }
        });
    })
    .then(data => {
      next({
        type: successType,
        data,
        meta: action.meta
      });
    })
    .catch(e => {
      next({
        type: errorType,
        error: e
      });
      return;
    });
};
