const Sequelize = require('sequelize');
const Listing = require('./schema').Listing;
const Host = require('./schema').Host;

const db = new Sequelize(process.env.DATABASE_URL || 'mysql://root@localhost/monkey', {
  password: '',
  dialect: 'mysql'
});

db
  .authenticate()
  .then(() => {
    console.log('Connection established...');
  })
  .catch((err) => {
    console.log('Unable to connect...', err);
  });

// mock hosts
Host.create({
  name: 'Sean Enright',
  email: 'seanenright@property.com',
  phone: 5413856987
})
.then((host) => {
  console.log('Created host ', host.get('name'));
})
.catch((err) => {
  console.log('Error creating host: ', err);
});

Host.create({
  name: 'Victor Choi',
  email: 'victorchoi@nest.com',
  phone: 5413762384
})
.then((host) => {
  console.log('Created host ', host.get('name'));
})
.catch((err) => {
  console.log('Error creating host: ', err);
});

Host.create({
  name: 'Zack Snyder',
  email: 'zacksnyder@mgmt.com',
  phone: 5035869374
})
.then((host) => {
  console.log('Created host ', host.get('name'));
})
.catch((err) => {
  console.log('Error creating host: ', err);
});

// mock listings
Listing.create({
  beds: 3,
  baths: 1.5,
  street: '1890 Page St',
  city: 'SAN FRANCISCO',
  state: 'CA',
  zip: 94117,
  unitNumber: 101,
  rent: 1200,
  sqFoot: 60,
  dogs: false,
  cats: false,
  term: 6,
  availableDate: '2016-11-07',
  images: 'image references go here',
  host_id: 1
})
.then((listing) => {
  console.log('Created listing at ', listing.get('street'));
})
.catch((err) => {
  console.log('Error creating listing: ', err);
});

Listing.create({
  beds: 2,
  baths: 1,
  street: '800 Bush St',
  city: 'SAN FRANCISCO',
  state: 'CA',
  zip: 94108,
  unitNumber: 424,
  rent: 1650,
  sqFoot: 700,
  dogs: true,
  cats: false,
  term: 12,
  availableDate: '2016-11-07',
  images: 'image references go here',
  host_id: 2
})
.then((listing) => {
  console.log('Created listing at ', listing.get('street'));
})
.catch((err) => {
  console.log('Error creating listing: ', err);
});

Listing.create({
  beds: 4,
  baths: 2.5,
  street: '123 4th Ave',
  city: 'CHICAGO',
  state: 'IL',
  zip: 94117,
  unitNumber: 56,
  rent: 1650,
  sqFoot: 450,
  dogs: true,
  cats: true,
  term: 1,
  availableDate: '2016-11-07',
  images: 'image references go here',
  host_id: 3
})
.then((listing) => {
  console.log('Created listing at ', listing.get('street'));
})
.catch((err) => {
  console.log('Error creating listing: ', err);
});

Listing.create({
  beds: 1,
  baths: 1,
  street: '999 Folsom St',
  city: 'CHICAGO',
  state: 'IL',
  zip: 94117,
  unitNumber: 3,
  rent: 2200,
  sqFoot: 100,
  dogs: false,
  cats: true,
  term: 12,
  availableDate: '2016-11-07',
  images: 'image references go here',
  host_id: 2
})
.then((listing) => {
  console.log('Created listing at ', listing.get('street'));
})
.catch((err) => {
  console.log('Error creating listing: ', err);
});
