import React from 'react';

import CitySearch from '../containers/city-search';
import SplashNav from '../components/splashnav';

const Splash = () => {
  return (
    <div>
      <div>
        <CitySearch />
      </div>
      <div>
        <SplashNav />
      </div>
    </div>
  );
};

export default Splash;
