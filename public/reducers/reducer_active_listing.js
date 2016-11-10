export default function (state = null, action) {
  switch (action.type) {
    case 'LISTING_SELECTED':
      return action.payload;
  }
  return state;
}
