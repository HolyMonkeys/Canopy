import React from 'react';
import { browserHistory } from 'react-router';

import OptionBox from './option_box';
import ListingsListItem from './listings_list_item';

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
        <ListingsListItem
          listing={listing}
          city={props.city}
          state={props.state}
          selectListing={props.selectListing}
          goToListing={goToListing}
        />
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
