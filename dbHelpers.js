const { saltPromise, hashPromise, comparePromise } = require('./authHelpers');
const RenterListing = require('./db/schema').RenterListing;
const Listing = require('./db/schema').Listing;
const City = require('./db/schema').City;
const Image = require('./db/schema').Image;
const User = require('./db/schema').User;
const Application = require('./db/schema').Application;
const RentalHistory = require('./db/schema').RentalHistory;

const geoCoder = require('./geoCoder');
const request = require('axios');
const parser = require('xml2json');
const config = require('./config');

module.exports = {

  signUp: (userData) => {
    return geoCoder.geocode(userData.homeBase)
    .then((res) => {
      return City.findOrCreate({
        where: {
          name: userData.homeBase.slice(0, -4).toUpperCase(),
          state: userData.homeBase.slice(-2).toUpperCase(),
          lat: res[0].latitude,
          lon: res[0].longitude
        }
      });
    })
    .spread((cityData) => {
      return User.find({ where: { email: userData.email } })
      .then((found) => {
        if (found) { throw new Error('User exists'); }
        return saltPromise(12);
      })
      .then((salt) => {
        return hashPromise(userData.password, salt);
      })
      .then((hash) => {
        return User.create({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: hash,
          userType: userData.userType,
          homebase_id: cityData.id
        });
      })
      .then((user) => {
        return User.find({ where: { id: user.id }, include: [City] });
      });
    });
  },

  signIn: (userData) => {
    return User.find({ where: { email: userData.email }, include: [City] })
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
        console.log(cityData);
        return cityData;
      })
      .catch((err) => {
        return `Error getting listings: ${err}`;
      });
    });
  },

  getListings: (cityId) => {
    return Listing.findAll({
      where: { city_id: cityId },
      include: [Image, City]
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
      include: [Image, City]
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
        return listing;
      })
      .catch((err) => {
        return `Error posting listing: ${err}`;
      });
  },

  updateListing: (update) => {
    return Listing.update(update, { where: { id: update.id } })
    .then(() => {
      return Listing.find({ where: { id: update.id }, include: [Image, City] });
    });
  },

  updateListingImages: ({ images, listing_id }) => {
    return Image.destroy({ where: { listing_id } })
    .then(() => {
      const bulkImages = images.map(({ ref }) => {
        return { listing_id, ref };
      });
      return Image.bulkCreate(bulkImages);
    });
  },

  removeListing: ({ id }) => {
    return Listing.destroy({ where: { id } });
  },

  getUserRenterListings: (userId) => {
    return RenterListing.findAll({
      where: { renter_id: userId },
      include: [{
        model: Listing,
        include: [Image, City]
      }]
    });
  },

  getUserHostListings: (userId) => {
    return Listing.findAll({
      where: { host_id: userId },
      include: [Image, City, RenterListing]
    });
  },

  postImages: (imageData) => {
    return new Promise((resolve, reject) => {
      const { images, listing_id } = imageData;
      images.forEach((image) => {
        Image.create({
          listing_id,
          ref: image
        })
        .catch((err) => {
          console.log('Error creating image: ', err);
          reject(err);
        });
      });
      resolve();
    });
  },

  postApplication: (applicationObj) => {
    return Application.create(applicationObj)
    .then((application) => {
      return application;
    })
    .catch((err) => {
      console.log('Error creating application: ', err);
    });
  },

  getApplication: (renterId) => {
    return Application.find({ where: { renter_id: renterId } })
    .then((application) => {
      return application;
    })
    .catch((err) => {
      console.log('Error fetching application: ', err);
    });
  },

  postRentalHistory: (rentalHistoryObj) => {
    return RentalHistory.create(rentalHistoryObj)
    .then((rentalHistory) => {
      return rentalHistory;
    })
    .catch((err) => {
      console.log('Error creating rental history: ', err);
    });
  },

  getRentalHistory: (applicationId) => {
    return RentalHistory.findAll({ where: { application_id: applicationId } })
    .then((rentalHistories) => {
      return rentalHistories;
    })
    .catch((err) => {
      console.log('Error fetching rental histories: ', err);
    });
  },

  applyToListing: (renterIdListingId) => {
    return RenterListing.findOrCreate({
      where: {
        renter_id: renterIdListingId.renterId },
      defaults: {
        listing_id: renterIdListingId.listingId
      }
    })
    .spread((renterListing) => {
      RenterListing.update(
        { hasApplied: true },
        { where: {
          renter_id: renterIdListingId.renterId,
          listing_id: renterIdListingId.listingId
        } });
      return renterListing;
    })
    .catch((err) => {
      console.log('Error creating renter listing: ', err);
    });
  },

 // Takes renter_id and listing_id and creates or updates renterlistings as a favorite
  addFavoriteListing: (renterIdListingId) => {
    return RenterListing.findOrCreate({
      where: {
        renter_id: renterIdListingId.renter_id,
        listing_id: renterIdListingId.listing_id
      },
      defaults: {
        favorited: true
      }
    }).spread((renterListing, created) => {
      if (!created) {
        return RenterListing.update({ favorited: true }, {
          where: { id: renterListing.dataValues.id }
        }).then((updated) => {
          return updated;
        });
      }
      return renterListing;
    })
    .catch((err) => {
      console.log('Error updating favorites:', err);
    });
  },

  getUserWithId: (renterId) => {
    return User.find({
      where: { id: renterId }
    });
  },

  updateUser: (userInfo) => {
    return module.exports.getCity(userInfo.homeBase)
    .then((cityData) => {
      const userSavingData = {};
      Object.assign(userSavingData, userInfo);
      userSavingData.homebase_id = cityData.id;
      console.log('CITY DATA', userSavingData);
      return User.update(userSavingData, {
        where: { email: userInfo.email }
      });
    })
    .then((success) => {
      return User.find({
        where: {
          email: userInfo.email
        },
        include: [City]
      });
    });
  }

};
