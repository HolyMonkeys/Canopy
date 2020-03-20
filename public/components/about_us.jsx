import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Meet The Team</h1><br />
      <div className="container-fluid">

        <div className="row" style={{ textAlign: 'center' }}>
          <div className="col-md-4">
            <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAfRAAAAJGZjMGNiNDhiLTljOTktNDY2YS1iZGQ0LTNiZWFhMjQ0ZDYwMw.jpg" />
          </div>
          <div className="col-md-4">
            <img src="https://pbs.twimg.com/profile_images/715936856840364032/sJLWV1Xi_400x400.jpg" />
          </div>
          <div className="col-md-4">
            <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAfxAAAAJGVlMGEwYmQ5LWU3MWQtNDc0NS1iNmViLWQzMDhmOTg0OTA2Zg.jpg" />
          </div>
        </div>

        <div className="row" style={{ textAlign: 'center' }}>
          <div className="col-md-4">
            <h2>Sean Enright</h2>
            <p>
              Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly. So gate at no only none open. Betrayed at properly it of graceful on. Dinner abroad am depart ye turned hearts as me wished. Therefore allowance too perfectly gentleman supposing man his now.
            </p>
          </div>

          <div className="col-md-4">
            <h2>Victor Choi</h2>
            <p>
              Extremely we promotion remainder eagerness enjoyment an. Ham her demands removal brought minuter raising invited gay. Contented consisted continual curiosity contained get sex. Forth child dried in in aware do. You had met they song how feel lain evil near. Small she avoid six yet table china.
            </p>
          </div>

          <div className="col-md-4">
            <h2>Zack Snyder</h2>
            <p>
              Feet evil to hold long he open knew an no. Apartments occasional boisterous as solicitude to introduced. Or fifteen covered we enjoyed demesne is in prepare. In stimulated my everything it literature. Greatly explain attempt perhaps in feeling he. House men taste bed not drawn joy.
            </p>
          </div>
        </div>

        <div className="row" style={{ textAlign: 'center' }}>
          <div className="col-md-4">
            <a target="_blank" href="https://github.com/pizzasaurusrex">
              <i className="fa fa-github about-links" />
            </a>
            <a target="_blank" href="https://www.linkedin.com">
              <i className="fa fa-linkedin-square about-links" />
            </a>
          </div>
          <div className="col-md-4">
            <a target="_blank" href="https://github.com/vchoisk">
              <i className="fa fa-github about-links" />
            </a>
            <a target="_blank" href="https://www.linkedin.com">
              <i className="fa fa-linkedin-square about-links" />
            </a>
          </div>
          <div className="col-md-4">
            <a target="_blank" href="https://github.com/zsnydr">
              <i className="fa fa-github about-links" />
            </a>
            <a target="_blank" href="https://www.linkedin.com">
              <i className="fa fa-linkedin-square about-links" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
