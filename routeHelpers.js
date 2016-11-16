// const fs = require('file-system');
// const path = require('path');
const geoCoder = require('./geoCoder');

const dbHelpers = require('./dbHelpers');
const { encodeJwt } = require('./authHelpers');


module.exports = {

  signUp: (req, res) => {
    dbHelpers.signUp(req.body)
    .then((user) => {
      res.json(encodeJwt(user));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  signIn: (req, res) => {
    dbHelpers.signIn(req.body)
    .then((user) => {
      res.json(encodeJwt(user));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  getCurrentPosition: (req, res) => {
    geoCoder.reverse({ lat: req.query.lat, lon: req.query.lon }, (err, data) => {
      res.send(`${data[0].city}, ${data[0].administrativeLevels.level1short}`);
    });
  },

  getCity: (req, res) => {
    dbHelpers.getCity(req.params.city)
    .then((city) => {
      res.json(city);
    })
    .catch((err) => {
      res.statusCode(400).send('Error: ', err);
    });
  },

  getListings: (req, res) => {
    dbHelpers.getListings(req.params.cityId)
    .then((listings) => {
      // console.log('listings from route helpers', listings);
      res.json(listings);
    })
    .catch((err) => {
      res.statusCode(400).send('Error: ', err);
    });
  },

  getListing: (req, res) => {
    dbHelpers.getListing(req.params.listingId)
    .then((listing) => {
      res.json(listing);
    })
    .catch((err) => {
      res.statusCode(400).send('Error: ', err);
    });
  },

  postListing: (req, res) => {
    dbHelpers.postListing(req.body)
    .then((listing) => {
      console.log('Posted listing: ', listing);
      res.json(listing);
    })
    .catch((err) => {
      console.log('Failed to post listing: ', err);
      res.json(err);
    });
  },

  postImages: (req, res) => {
    console.log("got to postImages")
    dbHelpers.postImages(req.body)
    .then(() => {
      res.end();
    });
  }

};
