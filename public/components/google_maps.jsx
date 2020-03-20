import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

export default (props) => {
  const updateToMarkerInfo = () => {
    return props.listings.map((listing) => {
      return {
        position: {
          lat: listing.lat,
          lng: listing.lon
        },
        key: listing.id,
        onClick: () => { props.focusListing(listing); }
      };
    });
  };

  return (
    <GoogleMapLoader
      containerElement={<div style={{ height: '100%' }} />}
      googleMapElement={
        <GoogleMap
          zoom={12}
          center={(props.listings.length === 1) ?
            { lat: props.listings[0].lat, lng: props.listings[0].lon } :
            { lat: props.focalLat, lng: props.focalLon }} >
          {updateToMarkerInfo().map((marker) => {
            return (<Marker
              {...marker}
            />);
          })}
        </GoogleMap>
      }
    />
  );
};
