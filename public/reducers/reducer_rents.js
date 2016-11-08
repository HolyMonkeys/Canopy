const originalListing =   [
    { apartment: 'Soma Square' },
    { apartment: 'One Hawthorn' },
    { apartment: 'NEMA' }
  ];


export default function (state = originalListing, action) {
  switch (action.type) {
    case 'UPDATE_LISTINGS':
      console.log("response from update listing", action.payload);
      return action.payload.data
  }

  return state;

}
