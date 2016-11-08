import { combineReducers } from 'redux';

import rents from './reducer_rents';
import activeCity from './reducer_active_city';

const rootReducer = combineReducers({
  activeCity,
  rents
});

export default rootReducer;
