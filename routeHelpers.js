const fs = require('file-system');
const path = require('path');

const dbHelpers = require('./dbHelpers');

module.exports = {
  getListings: (req, res) => {
    dbHelpers.getListings(req.params.city)
    .then((listings) => {
      console.log('listings from route helpers', listings);
      res.json(listings);
    })
    .catch((err) => {
      res.statusCode(400).send('Error: ', err);
    });
  },

  postListing: (req, res) => {
    dbHelpers.postListing(req.body)
    .then((listing) => {
      console.log('Posted listing: ', listing);
      res.send('Success');
    })
    .catch((err) => {
      console.log('Failed to post listing: ', err);
      res.json(err);
    });
  },

  getImages: (req, res) => {
    res.writeHead(201, { 'Content-Type': 'img/jpeg' });
    fs.readFile(path.join(__dirname, '/assets/', req.params.image), (err, data) => {
      if (err) {
        console.log('Error reading image: ', err);
      }
      res.end(data);
    });
  }
};
