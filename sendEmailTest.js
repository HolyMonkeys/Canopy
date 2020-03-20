var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'victorchoi3318@gmail.com',
    pass: 'lwuwjopolohaxuxq'
  }
});

var mailOptions = {
  to: 'victorchoi3318@gmail.com',
  subject: 'test for email',
  text: 'Your application for 611 Mission Street, vchoisk@gmail.com'
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    return console.log('Failed to send email', err);
  }
  console.log('E-mail sent!: ', info.response);
});
