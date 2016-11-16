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

Host.create({ name: 'zack' })
.then((host) => {
  console.log('CREATED ZACK ', host);
})
.catch((err) => {
  console.log('ERROR CREATING ZACK ', err);
});

Renter.create({ name: 'Sean' })
.then((renter) => {
  console.log('CREATED RENTER SEAN ', renter);
})
.catch((err) => {
  console.log('ERROR CREATING RENTER SEAN ', err);
});

Listing.create({ beds: 4 })
.then((listing) => {
  RenterListing.create({ renterId: 1, listingId: 1, status: 'available' })
  .then((renterlisting) => {
    console.log('CREATED RENTERLISTING ', renterlisting);
  })
  .catch((err) => {
    console.log('ERROR CREATING RENTERLISTING ', err);
  });
  console.log('CREATED LISTING ', listing);
})
.catch((err) => {
  console.log('ERROR CREATING LISTING ', err);
});
