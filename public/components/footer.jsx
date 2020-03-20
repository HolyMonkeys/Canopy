import React from 'react';
import { browserHistory } from 'react-router';

const Footer = () => {
  const goHome = () => {
    browserHistory.push('/');
  };

  const goToAboutUs = () => {
    browserHistory.push('/content/aboutus');
  };

  const goToTechStack = () => {
    browserHistory.push('/content/technologies');
  };

  return (
    <div className="navbar navbar-static-bottom" id="footer-container">
      <div className="text-center">
        <ul className="footer">
          <li onClick={goHome}><a>Canopy</a></li>
          <li onClick={goToAboutUs}><a>The Team</a></li>
          <li>
            <a target="_blank" href="https://github.com/HolyMonkeys/Canopy">
              Github
            </a>
          </li>
          <li onClick={goToTechStack}><a>TechStack</a></li>
        </ul>
        <ul className="footer">
          <li className="copyright"> &copy; 2016 Canopy | San Francisco, CA </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
