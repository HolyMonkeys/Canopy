import React from 'react';

import CitySearch from '../containers/city-search';
import SplashNav from '../components/splashnav';

const Splash = () => {
  return (
    <div>
      <div>
        <SplashNav />
      </div>
      <div>
        <CitySearch />
      </div>
    </div>
  );
};

export default Splash;
