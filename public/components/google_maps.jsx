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
        key: listing.id
        //Customize marker with the information in listing
      };
    });
  };
  return (
    <GoogleMapLoader
      containerElement={<div style={{ height: '100%' }} />}
      googleMapElement={
        <GoogleMap
          defaultZoom={12}
          defaultCenter={(props.listings.length === 1) ?
            { lat: props.listings[0].lat, lng: props.listings[0].lon } :
            { lat: props.position.lat, lng: props.position.long }} >
          {updateToMarkerInfo().map(marker => (
            <Marker
              {...marker}
            />
          ))}
        </GoogleMap>
      }
    />
  );
};
