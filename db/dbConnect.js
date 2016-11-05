const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'mysql://localhost/monkey', {
  host: 'localhost',
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

module.exports = db;
