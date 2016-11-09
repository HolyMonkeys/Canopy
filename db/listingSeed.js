const Sequelize = require('sequelize');
const Listing = require('./schema').Listing;
const Host = require('./schema').Host;
const City = require('./schema').City;

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
City.create({
  name: 'SAN FRANCISCO',
  state: 'CA',
  lat: 37.7749,
  lon: 122.4194
})
.then((city) => {
  console.log('Created city ', city.get('name'), city.get('state'));
})
.catch((err) => {
  console.log('Error creating city: ', err);
});

City.create({
  name: 'CHICAGO',
  state: 'IL',
  lat: 41.8781,
  lon: 87.6298
})
.then((city) => {
  console.log('Created city ', city.get('name'), city.get('state'));
})
.catch((err) => {
  console.log('Error creating city: ', err);
});

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
  city_id: 1,
  zip: 94117,
  unitNumber: 101,
  rent: 1200,
  sqFoot: 60,
  dogs: false,
  cats: false,
  term: 6,
  availableDate: '2016-11-07',
  images: 'image references go here',
  host_id: 1,
  lat: 37.77056,
  lon: -122.4541
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
  city_id: 1,
  zip: 94108,
  unitNumber: 424,
  rent: 1650,
  sqFoot: 700,
  dogs: true,
  cats: false,
  term: 12,
  availableDate: '2016-11-07',
  images: 'image references go here',
  host_id: 2,
  lat: 37.78413,
  lon: -122.39574
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
  street: '3022 W. Fletcher',
  city_id: 2,
  zip: 94117,
  unitNumber: 56,
  rent: 1650,
  sqFoot: 450,
  dogs: true,
  cats: true,
  term: 1,
  availableDate: '2016-11-07',
  images: 'image references go here',
  host_id: 3,
  lat: 41.9387,
  lon: -87.7059
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
  street: '911 W. Madison',
  city_id: 2,
  zip: 94117,
  unitNumber: 3,
  rent: 2200,
  sqFoot: 100,
  dogs: false,
  cats: true,
  term: 12,
  availableDate: '2016-11-07',
  images: 'image references go here',
  host_id: 2,
  lat: 41.8817,
  lon: -87.6528
})
.then((listing) => {
  console.log('Created listing at ', listing.get('street'));
})
.catch((err) => {
  console.log('Error creating listing: ', err);
});
