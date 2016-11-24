export default function (state = { type: 'form', renterId: 1 }, action) {
  switch (action.type) {
    case 'UPDATE_APPLICATION_TYPE':
      return action.payload;
  }
  return state;
}
