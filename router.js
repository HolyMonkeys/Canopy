const routeHelpers = require('./routeHelpers');
// const authHelpers = require('./authHelpers');

module.exports = (app) => {
  app.post('/api/signup', routeHelpers.signUp);

  app.post('/api/signin', routeHelpers.signIn);

  app.get('/api/position', routeHelpers.getCurrentPosition);

  app.get('/api/cities/:city', routeHelpers.getCity);

  app.get('/api/listings/:cityId', routeHelpers.getListings);

  app.post('/api/listings', routeHelpers.postListing);

  app.post('/api/updateListing', routeHelpers.updateListing);

  app.post('/api/updateListingImages', routeHelpers.updateListingImages);

  app.post('/api/removeListing', routeHelpers.removeListing);

  app.get('/api/listing/:listingId', routeHelpers.getListing);

  app.post('/api/images', routeHelpers.postImages);

  app.post('/api/application', routeHelpers.postApplication);
  app.get('/api/application/:renterId', routeHelpers.getApplication);

  app.post('/api/rentalHistory', routeHelpers.postRentalHistory);
  app.get('/api/rentalHistory/:applicationId', routeHelpers.getRentalHistory);

  app.post('/api/applyToListing', routeHelpers.applyToListing);

  app.get('/api/userRenterListings/:userId', routeHelpers.getUserRenterListings);

  app.get('/api/userHostListings/:userId', routeHelpers.getUserHostListings);

  app.post('/api/addfavorite', routeHelpers.addFavoriteListing);

  app.post('/api/sendMail', routeHelpers.sendEmail);

  app.post('/api/updateUser', routeHelpers.updateUser);
};
