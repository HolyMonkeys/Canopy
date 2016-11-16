const Sequelize = require('sequelize');
const Listing = require('./schema').Listing;
const User = require('./schema').User;
const City = require('./schema').City;
const Image = require('./schema').Image;

const db = new Sequelize('canopy', 'root', 'monkey', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
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
const cityData = [
  {
    name: 'SAN FRANCISCO',
    state: 'CA',
    lat: 37.7749295,
    lon: -122.4194155
  }, {
    name: 'CHICAGO',
    state: 'IL',
    lat: 41.8781136,
    lon: -87.6297982
  }];

const hostData = [
  {
    name: 'Sean Enright',
    email: 'seanenright@property.com',
    phone: 5413856987,
    userType: 'host'
  }, {
    name: 'Victor Choi',
    email: 'victorchoi@nest.com',
    phone: 5413762384,
    userType: 'host'
  }, {
    name: 'Zack Snyder',
    email: 'zacksnyder@mgmt.com',
    phone: 5035869374,
    userType: 'host'
  }];

// mock listings
const listingData = [
  {
    beds: 3,
    baths: 1.5,
    street: '1890 Page St',
    city_id: 1,
    zip: 94117,
    unitNumber: '#101',
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
  }, {
    beds: 2,
    baths: 1,
    street: '800 Bush St',
    city_id: 1,
    zip: 94108,
    unitNumber: "424G",
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
  }, {
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
  }, {
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
  }];
const imageData = [
  { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815237/tigar_emdap4.jpg'
  }, { listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815229/kawhi_wm1vki.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815224/fastRat_o8pmqh.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815234/panTuna_fep0v6.jpg'
  },{ listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815237/tigar_emdap4.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815229/kawhi_wm1vki.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815224/fastRat_o8pmqh.jpg'
  }, { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815234/panTuna_fep0v6.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815237/tigar_emdap4.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815229/kawhi_wm1vki.jpg'
  }, { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815224/fastRat_o8pmqh.jpg'
  }, { listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1478815234/panTuna_fep0v6.jpg'
  }];
/* c for Create
   p for Promise
   a for Array
*/
const cCitypa = (cityArray) => {
  return cityArray.map(city => City.create(city));
};
const cHostpa = (hostArray) => {
  return hostArray.map(host => User.create(host));
};
const cListingpa = (listingArray) => {
  return listingArray.map(listing => Listing.create(listing));
};
const cImagepa = (imageArray) => {
  return imageArray.map(image => Image.create(image));
};

// Actually calling all, with promise
Promise.all([
  ...cCitypa(cityData),
  ...cHostpa(hostData),
  ...cListingpa(listingData),
  ...cImagepa(imageData)
])
.then((all) => {
  console.log('Created image for ', all.length);
})
.catch((err) => {
  console.log('Error creating listing: ', err);
});

