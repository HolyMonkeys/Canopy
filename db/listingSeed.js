const Sequelize = require('sequelize');
const Listing = require('./schema').Listing;
const User = require('./schema').User;
const City = require('./schema').City;
const Image = require('./schema').Image;
const RenterListing = require('./schema').RenterListing;

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
  }, {
    name: 'NEW YORK',
    state: 'NY',
    lat: 40.730610,
    lon: -73.935242
  }, {
    name: 'LOS ANGELES',
    state: 'CA',
    lat: 34.052235,
    lon: -118.243683
  }];

const hostData = [
  {
    //renter
    name: 'Sean Enright',
    email: 'seanenright@property.com',
    phone: 5413856987,
    userType: 0,
    homebase_id: 2,
    password: '$2a$12$aZpDFAPJh9Ql04O40fJoyODmcsn8qq06KFnhK3ZTBsYRkAvF2d9jW'
  }, {
    //host
    name: 'Victor Choi',
    email: 'vchoisk@gmail.com',
    phone: 5413762384,
    userType: 1,
    homebase_id: 1,
    password: '$2a$12$aZpDFAPJh9Ql04O40fJoyODmcsn8qq06KFnhK3ZTBsYRkAvF2d9jW'
  }, {
    //both
    name: 'Zack Snyder',
    email: 'zacksnyder@mgmt.com',
    phone: 5035869374,
    userType: 2,
    homebase_id: 1,
    password: '$2a$12$aZpDFAPJh9Ql04O40fJoyODmcsn8qq06KFnhK3ZTBsYRkAvF2d9jW'
  }, {
    name: 'demo',
    email: 'demo@gmail.com',
    phone: 123456789,
    userType: 2,
    homebase_id: 3,
    password: '$2a$12$aZpDFAPJh9Ql04O40fJoyODmcsn8qq06KFnhK3ZTBsYRkAvF2d9jW'
  }];

// mock listings
const listingData = [
  {
    beds: 2,
    baths: 1.5,
    street: '239 Brannan St',
    city_id: 1,
    zip: 94107,
    unitNumber: '2G',
    rent: 5000,
    sqFoot: 893,
    dogs: true,
    cats: true,
    term: 12,
    smoking: false,
    parking: '2',
    laundry: 'In Unit',
    availableDate: '2016-11-07',
    host_id: 1,
    lat: 37.782646,
    lon: -122.39257,
    walkScore: `{"result":{"xmlns":"http://walkscore.com/2008/results","status":"1","walkscore":"91","description":"Walker's Paradise","updated":"2016-11-06 02:30:05.832330","logo_url":"https://cdn.walk.sc/images/api-logo.png","more_info_icon":"https://cdn.walk.sc/images/api-more-info.gif","more_info_link":"https://www.redfin.com/how-walk-score-works","ws_link":"https://www.walkscore.com/score/229-Brannan-St.and.San-Francisco.and.CA.and.94107/lat=37.7824503/lng=-122.3902843/?utm_source=138.68.11.13:3000&utm_medium=ws_api&utm_campaign=ws_api","help_link":"https://www.redfin.com/how-walk-score-works","snapped_lat":"37.7820","snapped_lon":"-122.3910"}}`
  }, {
    beds: 2,
    baths: 1,
    street: '800 Bush St',
    city_id: 1,
    zip: 94108,
    unitNumber: '424G',
    rent: 3000,
    sqFoot: 790,
    dogs: true,
    cats: false,
    term: 12,
    smoking: true,
    parking: '2',
    laundry: 'In Unit',
    availableDate: '2016-11-07',
    host_id: 3,
    lat: 37.78413,
    lon: -122.39574,
    walkScore: `{"result":{"xmlns":"http://walkscore.com/2008/results","status":"1","walkscore":"99","description":"Walker's Paradise","updated":"2016-07-13 08:26:39.720670","logo_url":"https://cdn.walk.sc/images/api-logo.png","more_info_icon":"https://cdn.walk.sc/images/api-more-info.gif","more_info_link":"https://www.redfin.com/how-walk-score-works","ws_link":"https://www.walkscore.com/score/800-Bush-Street.and.San-Francisco.and.CA.and.94108/lat=37.79014799999999/lng=-122.410717/?utm_source=138.68.11.13:3000&utm_medium=ws_api&utm_campaign=ws_api","help_link":"https://www.redfin.com/how-walk-score-works","snapped_lat":"37.7895","snapped_lon":"-122.4105"}}`
  },{
    beds: 2,
    baths: 2,
    street: '1725 Washington',
    city_id: 1,
    zip: 94109,
    unitNumber: '3',
    rent: 5000,
    sqFoot: 1100,
    dogs: true,
    cats: true,
    term: 12,
    smoking: false,
    parking: '1',
    laundry: 'In Unit',
    availableDate: '2016-11-07',
    host_id: 1,
    lat: 37.792924,
    lon: -122.4239177,
    walkScore: `{"result":{"xmlns":"http://walkscore.com/2008/results","status":"1","walkscore":"98","description":"Walker's Paradise","updated":"2016-11-07 23:29:20.984630","logo_url":"https://cdn.walk.sc/images/api-logo.png","more_info_icon":"https://cdn.walk.sc/images/api-more-info.gif","more_info_link":"https://www.redfin.com/how-walk-score-works","ws_link":"https://www.walkscore.com/score/1725-Washington.and.San-Francisco.and.CA.and.94109/lat=37.792924/lng=-122.421729/?utm_source=138.68.11.13:3000&utm_medium=ws_api&utm_campaign=ws_api","help_link":"https://www.redfin.com/how-walk-score-works","snapped_lat":"37.7925","snapped_lon":"-122.4210"}}`
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
    smoking: true,
    parking: '2',
    laundry: 'In Unit',
    availableDate: '2016-11-07',
    host_id: 3,
    lat: 41.9387,
    lon: -87.7059,
    walkScore: `{"result":{"xmlns":"http://walkscore.com/2008/results","status":"1","walkscore":"97","description":"Walker's Paradise","updated":"2016-09-14 14:24:41.797460","logo_url":"https://cdn.walk.sc/images/api-logo.png","more_info_icon":"https://cdn.walk.sc/images/api-more-info.gif","more_info_link":"https://www.redfin.com/how-walk-score-works","ws_link":"https://www.walkscore.com/score/18-10th-street.and.San-Francisco.and.CA.and.94103/lat=37.7756087/lng=-122.4169099/?utm_source=138.68.11.13:3000&utm_medium=ws_api&utm_campaign=ws_api","help_link":"https://www.redfin.com/how-walk-score-works","snapped_lat":"37.7760","snapped_lon":"-122.4165"}}`
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
    smoking: true,
    parking: '2',
    laundry: 'In Unit',
    availableDate: '2016-11-07',
    host_id: 3,
    lat: 41.8817,
    lon: -87.6528,
    walkScore: `{"result":{"xmlns":"http://walkscore.com/2008/results","status":"1","walkscore":"97","description":"Walker's Paradise","updated":"2016-09-14 14:24:41.797460","logo_url":"https://cdn.walk.sc/images/api-logo.png","more_info_icon":"https://cdn.walk.sc/images/api-more-info.gif","more_info_link":"https://www.redfin.com/how-walk-score-works","ws_link":"https://www.walkscore.com/score/18-10th-street.and.San-Francisco.and.CA.and.94103/lat=37.7756087/lng=-122.4169099/?utm_source=138.68.11.13:3000&utm_medium=ws_api&utm_campaign=ws_api","help_link":"https://www.redfin.com/how-walk-score-works","snapped_lat":"37.7760","snapped_lon":"-122.4165"}}`
  }];
const imageData = [
  { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528465/ISliswlgv36uvw0000000000_keko4q.jpg'
  }, { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528465/IShfr65u54n6s01000000000_ldaif1.jpg'
  }, { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528466/IStsxh0eskzcb91000000000_dau3m3.jpg'
  }, { listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528466/ISlygatn1gpql61000000000_ang9qz.jpg'
  },{ listing_id: 1,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528465/ISl6f63updtqa91000000000_feo9lg.jpg'
  }, { listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528465/ISliswlgv36uvw0000000000_keko4q.jpg'
  }, { listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528465/IS5qr0xs0x9cn81000000000_pqowg2.jpg'
  }, { listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528465/ISh71hdo17kic91000000000_cnwwwa.jpg'
  }, { listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528465/IS5yx6odisbyr01000000000_depje8.jpg'
  }, { listing_id: 2,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479528465/ISdw9pjn5iqp331000000000_e0doeh.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529166/IS-og0jhl5a1ba5_mcmdlr.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529166/IS-og0jhh77t7bx_bpgake.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529166/IS-og0jhl5a1ba5_mcmdlr.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529166/IS-og0jht1ehj6l_hv8vcs.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529166/IS-og0jcjmfo9jx_rrpd5w.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529166/IS-og0jcfodg5lp_zihiym.jpg'
  }, { listing_id: 4,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529166/IS-og0jcbqb81nh_qnwrxg.jpg'
  }, { listing_id: 5,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529166/IS-og0jc7s8zxp9_cfctsc.jpg'
  }, { listing_id: 5,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529166/IS-19moh61ilc7dp_w265nl.jpg'
  }, { listing_id: 5,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529615/IS882415mkax7n_hx9qfu.jpg'
  }, { listing_id: 5,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529615/IS882411oi2t9f_mu6jgj.jpg'
  }, { listing_id: 5,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529615/IS88240xqfupb7_lrb9pm.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529615/IS1pumwhn8q5ehv_etdawo.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529615/IS1pumwhjanxajn_lgdkco.jpg'
  }, { listing_id: 3,
    ref: 'http://res.cloudinary.com/canopydev/image/upload/v1479529615/IS1pumwhfclp6lf_u0gsq2.jpg'
  }];
const renterListingData = [
  { hostSeen: false, creditChecked: false, backgroundChecked: true, hasRentalHistory: false, hasApplied: false, renter_id: 3, listing_id: 1 },
  { hostSeen: true, creditChecked: true, backgroundChecked: true, hasRentalHistory: true, hasApplied: true, renter_id: 3, listing_id: 2 },
  { hostSeen: false, creditChecked: true, backgroundChecked: false, hasRentalHistory: true, hasApplied: false, renter_id: 2, listing_id: 3 },
  { hostSeen: true, creditChecked: false, backgroundChecked: false, hasRentalHistory: true, hasApplied: true, renter_id: 2, listing_id: 4 }
];
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
const cRenterListingpa = (renterListingArray) => {
  return renterListingArray.map(renterListing => RenterListing.create(renterListing));
};
// Actually calling all, with promise
Promise.all([
  ...cCitypa(cityData),
  ...cHostpa(hostData),
  ...cListingpa(listingData),
  ...cImagepa(imageData),
  ...cRenterListingpa(renterListingData)
])
.then((all) => {
  console.log('Created image for ', all.length);
})
.catch((err) => {
  console.log('Error creating listing: ', err);
});
