const request = require('./node_modules/axios');

request.post('/api/sendMail', {
  renterId: 1,
  textGen: (renterName) => { return `Hi, ${renterName}. This is the content of the email`; },
  mailOptions: {
    from: 'vchoisk@gmail.com',
    Subject: 'Your application for 611 Mission Street'
  }
})
.then((result) => {
  console.log('this works', result);
})
.catch((err) => {
  console.log(err);
});
