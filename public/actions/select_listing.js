export default function selectListing(listing) {
  // console.log('a listing has been selected', listing);
  return  {
    type: 'LISTING_SELECTED',
    payload: listing
  };
}
