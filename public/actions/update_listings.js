import request from 'axios';

export default function updateListings(city) {
  const listings = request.get(`/api/listings/${city}`);

  return {
    type: 'UPDATE_LISTINGS',
    payload: listings
  };
}
