const routeHelpers = require('./routeHelpers');
// const authHelpers = require('./authHelpers');

module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send('hello');
  });

  app.post('/api/signup', routeHelpers.signUp);

  app.post('/api/signin', routeHelpers.signIn);

  app.get('/api/position', routeHelpers.getCurrentPosition);

  app.get('/api/cities/:city', routeHelpers.getCity);

  app.get('/api/listings/:cityId', routeHelpers.getListings);

  app.post('/api/listings', routeHelpers.postListing);

  app.get('/api/listing/:listingId', routeHelpers.getListing);

  app.post('/api/images', routeHelpers.postImages);
};
