import request from 'axios';

export default function updateListings(city) {
  const listings = request.get(`/listings/${city}`);

  return {
    type: 'UPDATE_LISTINGS',
    payload: listings
  };
}
