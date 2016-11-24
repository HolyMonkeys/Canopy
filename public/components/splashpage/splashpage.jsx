import React from 'react';

import CitySearch from '../../containers/city-search';
import Nav from '../../containers/nav';
import TopCities from './top_cities';
import SplashAbout from './splash_about';

const Splash = () => {
  return (
    <div>
      <div className="main">
        <div>
          <Nav />
        </div>
        <div>
          <h1>Get ready to get comfortable</h1>
          <h2> in your new home </h2>
          <CitySearch />
        </div>
      </div>
      <div className="mainInfo">
        <TopCities />
      </div>
      <div className="splashAbout">
        <SplashAbout />
      </div>
    </div>
  );
};

export default Splash;
