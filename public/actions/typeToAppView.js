export default function typeToAppView(type) {
  return {
    type: 'VIEW_APPLICATION',
    payload: type
  };
}
