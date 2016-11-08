import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import routes from './routes';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
  ,
  document.querySelector('.container')
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
