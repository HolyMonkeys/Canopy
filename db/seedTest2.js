const mysql = require('mysql');
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'mysql://root@localhost/monkey', {
  password: '',
  dialect: 'mysql'
});

db
  .authenticate()
  .then((err) => {
    console.log('Connection established...');
  })
  .catch((err) => {
    console.log('Unable to connect...', err);
  });

const Listing = require('./schema').Listing;
const Host = require('./schema').Host;
const Renter = require('./schema').Renter;
const RenterListing = require('./schema').RenterListing;

Renter.find({ where: { name: 'Sean' },
  include: [{
    model: RenterListing,
    include: [{
      model: Listing
    }]
  }]
})
.then((renters) => {
  console.log('RENTERS ', renters);
  console.log('RENTERSLISTINGS ', renters.renterlistings);
  console.log('RENTERSLISTINGSLISTING ', renters.renterlistings[0].listing);
})
.catch((err) => {
  console.log('ERROR FINDING RENTERS ', err);
});
