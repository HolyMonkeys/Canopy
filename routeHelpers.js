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
  }
};
