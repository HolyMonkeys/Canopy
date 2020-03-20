export default function (state = null, action) {
  switch (action.type) {
    case 'LISTINGS_COMPARED':
      return action.payload;
  }
  return state;
}
