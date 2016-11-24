export default function (state = null, action) {
  switch (action.type) {
    case 'LISTING_SELECTED':
    console.log('ACTION ', action.payload)
      return action.payload;
  }
  return state;
}
