import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import Nav from './containers/nav';
import Listings from './containers/listings-page';
import Splash from './components/splashpage';
import ListingPage from './containers/listing-page';
import ListingPageEdit from './components/listing/edit/listing_page_edit';
import AddListing from './components/add_listing_page';
import SignIn from './containers/sign_in';
import SignUp from './containers/sign_up';
import UserProfile from './containers/user-profile';
import ApplicationPage from './containers/application-page';
import CompareListings from './containers/compare-listings-page';
import AboutUs from './components/about_us';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Splash} />
    <Route path="content" component={Nav}>
      <Route path="signup" component={SignUp} />
      <Route path="signin" component={SignIn} />
      <Route path="profile/:id" component={UserProfile} />
      <Route path="listings" component={Listings} />
      <Route path="listing/:id" component={ListingPage} />
      <Route path="editListing/:id" component={ListingPageEdit} />
      <Route path="addListing" component={AddListing} />
      <Route path="application" component={ApplicationPage} />
      <Route path="compareListings" component={CompareListings} />
      <Route path="aboutus" component={AboutUs} />
    </Route>
  </Route>
);
