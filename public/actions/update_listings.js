export default function updateListings(listings) {
  return {
    type: 'UPDATE_LISTINGS',
    payload: listings
  };
}
