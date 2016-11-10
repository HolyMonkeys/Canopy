const helpers = require('./routeHelpers');

module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send('hello');
  });


  app.get('/listings/:city', helpers.getListings);
};
