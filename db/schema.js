const Sequelize = require('sequelize');

// open database connection
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

// define models
const Listing = db.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  beds: Sequelize.INTEGER,
  baths: Sequelize.DECIMAL(10, 1),
  street: Sequelize.TEXT,
  city: Sequelize.TEXT,
  state: Sequelize.CHAR(2),
  zip: Sequelize.INTEGER,
  unitNumber: Sequelize.INTEGER,
  rent: Sequelize.INTEGER,
  sqFoot: Sequelize.INTEGER,
  dogs: Sequelize.BOOLEAN,
  cats: Sequelize.BOOLEAN,
  term: Sequelize.INTEGER,
  availableDate: Sequelize.DATEONLY,
  images: Sequelize.TEXT
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

// define model relationships
Host.hasMany(Listing, { foreignKey: 'host_id' });

Renter.hasMany(RenterListing);
Listing.hasMany(RenterListing);

RenterListing.belongsTo(Renter);
RenterListing.belongsTo(Listing);

// build tables
db.sync({ force: false })
.then(() => {
  console.log('Tables created');
}).catch((err) => {
  console.log('Failed to create tables...', err);
});

module.exports = {
  Listing,
  Host,
  Renter,
  RenterListing
};
