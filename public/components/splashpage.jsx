import React from 'react';

import CitySearch from '../containers/city-search';
import SplashNav from '../components/splashnav';

const Splash = () => {
  return (
    <div className="main">
      <div>
        <SplashNav />
      </div>
      <div>
        <h1>canopy</h1>
        <CitySearch />
      </div>
    </div>
  );
};

export default Splash;
