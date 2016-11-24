export default function compareListings(listings) {
  return {
    type: 'LISTINGS_COMPARED',
    payload: listings
  };
}
