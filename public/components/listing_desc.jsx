import React from 'react';

const ListingDesc = ({ activeListing, activeCity }) => {
  return (
    <div className="listingInfo">
      <h2>{activeListing.street}</h2>
      <h3>{activeCity.name}, {activeCity.state} {activeListing.zip}</h3><br />
      <div>
        <div className="details">
          <h4> Unit: {activeListing.unit} </h4>
          <h4> Beds: {activeListing.beds}</h4>
          <h4> Baths: {activeListing.baths}</h4>
        </div>
        <div className="details">
          <h4>Rent: ${activeListing.rent}</h4>
          <h4>SqFoot: {activeListing.sqFoot}</h4>
          <h4>Available: {activeListing.availableDate.slice(0, 10)}</h4>
        </div>
        <br />
        <button>Apply</button>
      </div>
    </div>
  );
};

export default ListingDesc;

