import React from 'react';

import CitySearch from '../../containers/city-search';
import Nav from '../../containers/nav';
import TopCities from './top_cities';
import SplashAbout from './splash_about';

const Splash = () => {
  return (
    <div>
      <Nav />
      <div className="splash-main">
        <h1>Where will you call Home</h1>
        <CitySearch />
      </div>
      <div className="splash-cities">
        <TopCities />
      </div>
      <div className="splash-about">
        <SplashAbout />
      </div>
    </div>
  );
};

export default Splash;
