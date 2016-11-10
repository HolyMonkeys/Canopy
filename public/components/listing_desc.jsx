import React from 'react';

const ListingDesc = ({ activeListing, listingData }) => {
  return (
    <div>
      <h3>{activeListing.street}</h3>
      <h4>{listingData.name}, {listingData.state} {activeListing.zip}</h4><br />
      <div>
        Unit: {activeListing.unit}
        Beds: {activeListing.beds}
        Baths: {activeListing.baths}
        Rent: {activeListing.rent}
        SqFoot: {activeListing.sqFoot}
        Available: {activeListing.availableDate}
        <br />
        <button>Apply</button>
      </div>
    </div>
  );
};

export default ListingDesc;
