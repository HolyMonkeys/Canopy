import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import listings from './reducer_listings';
import activeCity from './reducer_active_city';
import activeListing from './reducer_active_listing';
import activeUser from './reducer_active_user';
import compareListings from './reducer_compare_listings';
import applicationType from './reducer_application_type';

const rootReducer = combineReducers({
  routing: routerReducer,
  activeListing,
  activeCity,
  activeUser,
  listings,
  compareListings,
  applicationType
});

export default rootReducer;
