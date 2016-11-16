const { saltPromise, hashPromise, comparePromise } = require('./authHelpers');
const Listing = require('./db/schema').Listing;
const City = require('./db/schema').City;
const Image = require('./db/schema').Image;
const User = require('./db/schema').User;

const geoCoder = require('./geoCoder');
const bcrypt = require('bcrypt');
const request = require('axios');
const parser = require('xml2json');
const config = require('./config')

module.exports = {

  signUp: (userData) => {
    return User.find({ where: { email: userData.email } })
    .then((found) => {
      if (found) { throw new Error('User exists'); }
      return saltPromise(12);
    })
    .then((salt) => {
      return hashPromise(userData.password, salt);
    })
    .then((hash) => {
      return User.create({ email: userData.email, password: hash });
    })
    .then((user) => {
      return user;
    });
  },

  signIn: (userData) => {
    return User.find({ where: { email: userData.email } })
    .then((user) => {
      if (!user) { throw new Error('User does not exist'); }
      return comparePromise(userData.password, user);
    })
    .then(({ user, match }) => {
      if (!match) { throw new Error('Password invalid'); }
      return user;
    });
  },

  getCity: (city) => {
    return geoCoder.geocode(city)
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
      });
    });
  },

  getListings: (cityId) => {
    console.log('IN GET LISTINGS')
    return Listing.findAll({
      where: {
        city_id: cityId
      },
      include: [Image]
    })
    .then((listings) => {
      return listings;
    })
    .catch((err) => {
      return `Error getting listings: ${err}`;
    });
  },

  getListing: (listingId) => {
    return Listing.find({
      where: { id: listingId },
      include: [Image]
    })
    .then((listing) => {
      return listing;
    })
    .catch((err) => {
      return `Error getting listing: ${err}`;
    });
  },

  postListing: (listingInfo) => {
    return geoCoder.geocode(`${listingInfo.street} ${listingInfo.city}, ${listingInfo.state}`)
    .then((res) => {
      listingInfo.lat = res[0].latitude;
      listingInfo.lon = res[0].longitude;
      const options = {
        lat: res[0].latitude,
        lon: res[0].longitude,
        wsapikey: config.wsAPIkey
      };
      let params = Object.assign({
        address: `${listingInfo.street}&${listingInfo.city}&${listingInfo.state}&${listingInfo.zip}`
      }, options);
      return request.get('http://api.walkscore.com/score', { params })
    })
    .then((walkscoreXML) => {
      const walkScoreJSON = parser.toJson(walkscoreXML.data);
      listingInfo.walkScore = walkScoreJSON;

      return Listing.create(listingInfo); 
    })
      .then((listing) => {
        console.log("listing created", listing)
        return listing;
      })
      .catch((err) => {
        return `Error posting listing: ${err}`;
      })
  },

  postImages: (imageData) => {
    console.log(imageData);
    return new Promise((resolve, reject) => {
      const { images, listing_id } = imageData;
      images.forEach((image) => {
        Image.create({
          listing_id,
          ref: image
        })
        .then((img) => {
          console.log('Created image: ', img);
        })
        .catch((err) => {
          console.log('Error creating image: ', err);
          reject(err);
        });
      });
      resolve();
    });
  }
};

//ghost code lives down here!!

    //   //update listingInfo with walkscore
      // params = Object.assign({ city: listingInfo.city, state: listingInfo.state }, options);
      // request.get('http://transit.walkscore.com/transit/score/?lat=47.6101359&lon=-122.3420567&city=Seattle&state=WA&wsapikey=6097c708f6567e7055fc6fb0c8d281f6')
      //   .then(function(transitscoreXML) {
      // console.log('++++++++++Transit Score++++++++', transitscoreXML);
