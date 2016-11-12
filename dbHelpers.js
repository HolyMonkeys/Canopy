const Listing = require('./db/schema').Listing;
const City = require('./db/schema').City;
const Image = require('./db/schema').Image;
const ListingImage = require('./db/schema').ListingImage;

const geoCoder = require('./geoCoder');
// const Host = require('./db/schema').Host;
// const Renter = require('./db/schema').Renter;
// const RenterListing = require('./db/schema').RenterListing;

const forCCity = (city) => {
  return geoCoder.geocode(city)
  .then((res) => {
    return City.findOrCreate({
      where: {
        name: city.slice(0, -4).toUpperCase(),
        state: city.slice(-2).toUpperCase(),
        lat: res[0].latitude,
        lon: res[0].longitude
      }
    });
  });
};

module.exports = {
  getListings: (city) => {
    return forCCity(city)
    .spread((cityElem) => {
      return Listing.findAll({
        where: {
          city_id: cityElem.id
        },
        include: [{
          model: ListingImage,
          include: [Image]
        }]
      });
    })
    .then((listingData) => {
      console.log('listingData: ', listingData);
      return listingData;
    })
    .catch((err) => {
      return `Error getting listings: ${err}`;
    });
  },

  postListing: (listingInfo) => {
    const city = `${listingInfo.city}, ${listingInfo.state}`;
    geoCoder.geocode(city)
    .then((res) => {
      return City.findOrCreate({
        where: {
          name: city.slice(0, -4).toUpperCase(),
          state: city.slice(-2).toUpperCase(),
          lat: res[0].latitude,
          lon: res[0].longitude
        }
      })
      .spread((cityData) => {
        return cityData;
      })
      .catch((err) => {
        return `Error getting listings: ${err}`;
      }).then((response) => {
        //make another geoCoder api req to get lat, long of listing
        geoCoder.geocode( {address: listingInfo.street, city: 'San Francisco', state: 'CA'} );
        listingInfo.lat = response[0].latitude;
        listingInfo.lon = response[0].longitude;
        listingInfo.city_id = response[0].id;
        Listing.create(listingInfo)
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
