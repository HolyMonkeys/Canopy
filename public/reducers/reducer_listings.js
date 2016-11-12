export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_LISTINGS':
      // console.log('response from update listing', action.payload.data);
      return action.payload.data;
  }

  return state;
}
