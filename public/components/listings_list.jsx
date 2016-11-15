import React from 'react';
import { browserHistory } from 'react-router';

import OptionBox from './option_box';

const ListingsList = (props) => {
  const goToListing = (listing) => {
    browserHistory.push(`/content/listing/${listing.id}`);
  };

  const renderListings = () => {
    if (!props.listings || !props.listings.length) {
      return <div>No listings in this local..</div>;
    }

    return props.listings.map((listing) => {
      return (
        <div
          className="listing"
          key={listing.id}
          onClick={() => {
            props.selectListing(listing);
            goToListing(listing);
          }}
        >
          <div className="listingImg">
            image goes here
          </div>
          <div className="listingListDetails">
            <h3>${listing.rent}</h3>
            <h3>{listing.street}</h3>
            <h3>{props.city}, {props.state}</h3>

            <div className="listingDetails">
              <h4>beds</h4>
              <h4>{listing.beds}</h4>
            </div>
            <div className="listingDetails">
              <h4>baths</h4>
              <h4>{listing.baths}</h4>
            </div>
            <div className="listingDetails">
              <h4>sq. foot</h4>
              <h4>{listing.sqFoot}</h4>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <OptionBox
        bedFilterHeader={props.bedFilterHeader}
        bathFilterHeader={props.bathFilterHeader}
        minRentFilterHeader={props.minRentFilterHeader}
        maxRentFilterHeader={(props.maxRentFilterHeader === '$100000') ? '' : props.maxRentFilterHeader}
        updateBedFilter={props.updateBedFilter}
        updateBathFilter={props.updateBathFilter}
        updateMinRentFilter={props.updateMinRentFilter}
        updateMaxRentFilter={props.updateMaxRentFilter}
        updateSorter={props.updateSorter}
      />
      {renderListings()}
    </div>
  );
};

export default ListingsList;
