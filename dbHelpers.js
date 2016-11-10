const Listing = require('./db/schema').Listing;
const City = require('./db/schema').City;
// const Host = require('./db/schema').Host;
// const Renter = require('./db/schema').Renter;
// const RenterListing = require('./db/schema').RenterListing;

module.exports = {
  getListings: (city) => {
    return City.findOrCreate({
      where: {
        name: city.slice(0, -4).toUpperCase(),
        state: city.slice(-2).toUpperCase()
      },
      include: [Listing]
    })
    .spread((cityData, created) => {
      return created ? {} : cityData;
    })
    .catch((err) => {
      return `Error getting listings: ${err}`;
    });
  }
};
