import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory, browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxPromise from 'redux-promise';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import routes from './routes';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

//
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store);
//

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  ,
  document.querySelector('.canopyReactApp')
);


// Hot Reloading.  Not currently working
// if (module.hot) {
//   module.hot.accept('./hotMiddleWare', () => {
//     const newHot = require('./hotMiddleWare').default;

//     ReactDOM.render(
//       <newHot />,
//      document.querySelector('.container')
//     );
//   });
// }
