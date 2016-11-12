import React from 'react';
import { Link } from 'react-router';

const SplashNav = () => {
  return (
    <div>
      <Link to="/signin"> Sign In </Link>
      <Link to="/signup"> Sign Up </Link>
    </div>
  );
};

export default SplashNav;
