const cloudinary = require('cloudinary');
const Listing = require('./db/schema').Listing;
const City = require('./db/schema').City;
const Image = require('./db/schema').Image;

const geoCoder = require('./geoCoder');
// const Host = require('./db/schema').Host;
// const Renter = require('./db/schema').Renter;
// const RenterListing = require('./db/schema').RenterListing;

cloudinary.config({
  cloud_name: 'canopydev',
  api_key: '526329837636264',
  api_secret: 'yiKTPiLh21fqA9AiXMPpo45mkwU'
});

const forCCity = (city) => {
  return geoCoder.geocode(city)
  .then((cityLoc) => {
    return City.findOrCreate({
      where: {
        name: city.slice(0, -4).toUpperCase(),
        state: city.slice(-2).toUpperCase(),
        lat: cityLoc[0].latitude,
        lon: cityLoc[0].longitude
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
        include: [City, Image]
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
    return forCCity(`${listingInfo.city}, ${listingInfo.state}`)
    .spread((cityData) => {
      console.log('DB: city', cityData);
      return geoCoder.geocode({
        address: listingInfo.street,
        city: cityData.get('city'),
        state: cityData.get('state')
      })
      .then((houseLoc) => {
        console.log('GC: street', houseLoc);
        listingInfo.lat = houseLoc[0].latitude;
        listingInfo.lon = houseLoc[0].longitude;
        listingInfo.city_id = cityData.get('id');
        return Listing.create(listingInfo);
      })
      .then((listing) => {
        console.log('DB: listing', listing);
        console.log('Created listing at ', listing.get('id'));
        console.log('images: ', listingInfo.images);
        return Promise.all(
          listingInfo.images.map((image) => {
            return cloudinary.uploader.upload(image[0].preview, (result) => {
              console.log(result);
              return result.url;
            });
          })
        )
        .then((imgUrls) => {
          return Promise.all(
            imgUrls.map((imgUrl) => {
              return Image.create({
                ref: imgUrl,
                listing_id: listing.id
              });
            })
          );
        });
      })
      .then(() => {
        return 'Successfully posted listing to DB, and images to cloudinary';
      })
      .catch((err) => {
        console.log('Error creating listing: ', err);
      });
    });
  }
};
