export default function selectUser(user) {
  return {
    type: 'USER_SELECTED',
    payload: user
  };
}
