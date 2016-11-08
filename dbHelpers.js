const Listing = require('./db/schema').Listing;
// const Host = require('./db/schema').Host;
// const Renter = require('./db/schema').Renter;
// const RenterListing = require('./db/schema').RenterListing;

module.exports = {
  getListings: (city) => {
    return Listing.findAll({
      where: {
        city: city.slice(0, -4).toUpperCase(),
        state: city.slice(-2).toUpperCase()
      }
    })
    .then((listings) => {
      return listings;
    })
    .catch((err) => {
      return `Error getting listings: ${err}`;
    });
  }
};
