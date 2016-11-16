import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import listings from './reducer_listings';
import activeCity from './reducer_active_city';
import activeListing from './reducer_active_listing';
import activeUser from './reducer_active_user';

const rootReducer = combineReducers({
  routing: routerReducer,
  activeListing,
  activeCity,
  activeUser,
  listings
});

export default rootReducer;
