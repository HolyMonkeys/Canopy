const dbHelpers = require('./dbHelpers');

module.exports.getListings = (req, res) => {
  dbHelpers.getListings(req.params.city)
  .then((listings) => {
    console.log('listings from route helpers', listings)
    res.json(listings);
  })
  .catch((err) => {
    res.statusCode(400).send('Error: ', err);
  });
};
