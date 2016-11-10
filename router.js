const helpers = require('./routeHelpers');

module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send('hello');
  });

  app.get('/api/listings/:city', helpers.getListings);

  app.post('/api/listings', helpers.postListing);

  app.get('/api/images/:image', helpers.getImages);
};
