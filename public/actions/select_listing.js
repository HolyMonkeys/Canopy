export default function selectListing(listing) {
  return {
    type: 'LISTING_SELECTED',
    payload: listing
  };
}
