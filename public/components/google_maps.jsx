import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

export default (props) => {
  const updateToMarkerInfo = () => {
    console.log('updateTo Marker',props.listings);
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
      containerElement={<div style={{ height: '400px' }} />}
      googleMapElement={
        <GoogleMap 
          defaultZoom={12} 
          defaultCenter={{ lat: props.position.lat, lng: props.position.long }}>
          {updateToMarkerInfo().map((marker) => (
            <Marker
              {...marker}
            />
          ))}
        </GoogleMap>
      }
    />
  );
};
