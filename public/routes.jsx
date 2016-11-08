import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import Nav from './containers/nav';
import RentList from './containers/listingspage';
import Splash from './components/splashpage';
import ListingPage from './components/listingpage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Splash} />
    <Route path="content" component={Nav}>
      <Route path="listings" component={Listings} />
      <Route path="listing/:id" component={ListingPage} />
    </Route>
);
