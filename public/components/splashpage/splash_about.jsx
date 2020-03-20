import React from 'react';

const splashAbout = () => {
  return (
    <div className="container-fluid">
      <h3 className="splash-about-header">One Application. Unlimited Possibilities.</h3>
      <div className="row">
        <div className="col-md-6 splash-about-desc-top">
          <h3>Renting Made Easy</h3>
          <hr />
          <p>
            Whether you are a first time renter or have years of experience, we
            make it easy to find the rental of your dreams.  Simply fill out the
            streamlined application, apply to any listing with a single click and
            leave the rest to us.
          </p>
        </div>
        <div className="col-md-6 splash-about-img-top">
          <img src="./app.svg" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 splash-about-img-middle">
          <img src="./checks.svg" />
        </div>
        <div className="col-md-6 splash-about-desc-middle">
          <h3>Transparency in Action</h3>
          <hr />
          <p>
            We create transparency for property owners by verifying the background
            of all potential tenants.  As a renter, a single comprehensive listing
            form gets you the information you need to make an informed decision
            and get on with your life.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 splash-about-desc-top">
          <h3>Effortless Communication</h3>
          <hr />
          <p>
            Communication is key in any new relationship.  Once you've found the
            perfect place to call home, let us facilitate the interaction between
            future tenant and landlord to ensure a smooth and pleasant transition.
          </p>
        </div>
        <div className="col-md-6 splash-about-img-bottom">
          <img src="./comm.svg" />
        </div>
      </div>
    </div>
  );
};

export default splashAbout;
