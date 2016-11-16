const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const Promise = require('bluebird');


module.exports = {

  isAuthenticated: (req, res, next) => {
    // const token = req.headers['x-access-token'];
    // console.log('XXXXX', req.body.token);
    if (!req.body.token) {
      next(new Error('No token'));
    } else {
      const user = jwt.decode(req.body.token, 'monkey');
      next(user);
    }
  },

  encodeJwt: (user) => {
    const token = jwt.encode(user.email, 'monkey');
    return ({ user, token });
  },

  saltPromise: (numRounds) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(numRounds, (err, salt) => {
        if (err) { reject(err); }
        resolve(salt);
      });
    });
  },

  hashPromise: (pass, salt) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) { reject(err); }
        resolve(hash);
      });
    });
  },

  comparePromise: (candidate, user) => {
    return new Promise((resolve, reject) => {
      // const saved = user.get('password');
      bcrypt.compare(candidate, user.password, (err, match) => {
        if (err) { reject(err); }
        resolve({ user, match });
      });
    });
  }

};
