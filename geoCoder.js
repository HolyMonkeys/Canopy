const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCXCR1cpTYWsANWhgE1UJwtR1qrkapLiCg', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

module.exports = NodeGeocoder(options);
