const Sequelize = require('sequelize');

// open database connection
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

// define models
const City = db.define('city', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  state: Sequelize.CHAR(2),
  lat: Sequelize.DECIMAL(10, 7),
  lon: Sequelize.DECIMAL(10, 7)
});

const Listing = db.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  beds: Sequelize.INTEGER,
  baths: Sequelize.DECIMAL(10, 1),
  street: Sequelize.TEXT,
  zip: Sequelize.INTEGER,
  lat: Sequelize.DECIMAL(10, 7),
  lon: Sequelize.DECIMAL(10, 7),
  unitNumber: Sequelize.INTEGER,
  rent: Sequelize.INTEGER,
  sqFoot: Sequelize.INTEGER,
  dogs: Sequelize.BOOLEAN,
  cats: Sequelize.BOOLEAN,
  term: Sequelize.INTEGER,
  availableDate: Sequelize.DATEONLY
});

const Host = db.define('host', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numListings: {
    type: Sequelize.INTEGER,
    default: 0
  },
  numRatings: {
    type: Sequelize.INTEGER,
    default: 0
  },
  avgRating: {
    type: Sequelize.DECIMAL(10, 1),
    default: 0
  },
  name: Sequelize.TEXT,
  email: Sequelize.TEXT,
  phone: Sequelize.BIGINT
});

const Renter = db.define('renter', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  email: Sequelize.TEXT,
  phone: Sequelize.INTEGER,
  password: Sequelize.TEXT,
  numApplied: {
    type: Sequelize.INTEGER,
    default: 0
  }
});

const RenterListing = db.define('renterlisting', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: Sequelize.TEXT
});

const Image = db.define('image', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ref: Sequelize.TEXT
});


// define model relationships
Listing.belongsTo(Host, { foreignKey: 'host_id' });
Host.hasMany(Listing, { foreignKey: 'host_id' });
Listing.belongsTo(City, { foreignKey: 'city_id' });
City.hasMany(Listing, { foreignKey: 'city_id' });

Renter.hasMany(RenterListing);
RenterListing.belongsTo(Renter);
RenterListing.belongsTo(Listing);
Listing.hasMany(RenterListing);

Image.belongsTo(Listing, { foreignKey: 'listing_id' });
Listing.hasMany(Image, { foreignKey: 'listing_id' });


// build tables
db.sync({ force: false })
.then(() => {
  console.log('Tables created');
}).catch((err) => {
  console.log('Failed to create tables...', err);
});

module.exports = {
  City,
  Listing,
  Host,
  Renter,
  RenterListing,
  Image
};
