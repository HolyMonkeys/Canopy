const Listing = require('./db/schema').Listing;
const City = require('./db/schema').City;
const Image = require('./db/schema').Image;
const ListingImage = require('./db/schema').ListingImage;

const geoCoder = require('./geoCoder');
// const Host = require('./db/schema').Host;
// const Renter = require('./db/schema').Renter;
// const RenterListing = require('./db/schema').RenterListing;

module.exports = {
  getListings: (city) => {
    return geoCoder.geocode(city)
    .then((res) => {
      return City.findOrCreate({
        where: {
          name: city.slice(0, -4).toUpperCase(),
          state: city.slice(-2).toUpperCase(),
          lat: res[0].latitude,
          lon: res[0].longitude
        },
        include: [{
          model: Listing,
          include: [{
            model: ListingImage,
            include: [Image]
          }]
        }]
      })
      .spread((cityData) => {
        console.log('cityData: ', cityData);
        return cityData;
      })
      .catch((err) => {
        return `Error getting listings: ${err}`;
      });
    });
  },

  postListing: (listingInfo) => {
    const listingForDb = listingInfo;
    const city = `${listingForDb.city}, ${listingForDb.state}`;
    geoCoder.geocode(city)
    .then((res) => {
      return City.findOrCreate({
        where: {
          name: city.slice(0, -4).toUpperCase(),
          state: city.slice(-2).toUpperCase(),
          lat: res[0].latitude,
          lon: res[0].longitude
        },
        include: [{
          model: Listing,
          include: [{
            model: ListingImage,
            include: [Image]
          }]
        }]
      })
      .spread((cityData) => {
        return cityData;
      })
      .catch((err) => {
        return `Error getting listings: ${err}`;
      }).then((response) => {
        delete listingForDb.city;
        delete listingForDb.state;
        listingForDb.lat = response[0].latitude;
        listingForDb.lon = response[0].longitude;
        listingForDb.city_id = response[0].id;
        Listing.create(listingForDb)
        .then((listing) => {
          console.log('Created listing at ', listing.get('id'));
          return listing.get('id');
        })
        .catch((err) => {
          console.log('Error creating listing: ', err);
        });
      });
    });
  }
};
