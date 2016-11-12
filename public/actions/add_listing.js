import request from 'axios';

export default function addListing(listingData) {
  console.log("listingdata!!!", listingData);
  request.post('/api/listings', listingData);
}
