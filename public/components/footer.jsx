import React from 'react';
import { browserHistory } from 'react-router';

const Footer = (props) => {

  const goToAboutUs = () => {
    browserHistory.push('/content/aboutus');
  }

  return (
    <div className="navbar navbar-static-bottom" id="footer-container">
      <hr />
      <div className="text-center">
        <ul className="footer">
          <li>TechStack</li>
          <li onClick={goToAboutUs}>ABOUT US</li>
          <li>GitHub</li>
          <li>Canopy</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
