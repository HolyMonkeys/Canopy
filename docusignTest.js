const request = require('./node_modules/axios');

/*
curl -i -H 'X-DocuSign-Authentication:
              { "Username":"vchoisk@gmail.com",
                "Password":"monkey",
                "IntegratorKey":"6eb91a2d-3aae-4280-85be-56cc9efe1efd" }'\
          https://demo.docusign.net/restapi/v2/login_information
*/
const key1 = '6eb91a2d-3aae-4280-85be-56cc9efe1efd';
const key2 = '676a0b5c-b793-4fa7-9a63-a2f75e044d75';
const IntegratorKey = '6eb91a2d-3aae-4280-85be-56cc9efe1efd';
const headers = {
  "Accept":'application/json',
  "Content-Type":'application/json',
  "X-DocuSign-Authentication":{
    "Username":"vchoisk@gmail.com",
    "Password":"monkey",
    IntegratorKey
  }
};
request.create({ headers });

const exampleTemplate = {
  "emailSubject": "DocuSign REST API Quickstart Sample",
  "emailBlurb": "Shows how to create and send an envelope from a document.",
  "recipients": {
    "signers": [{
      "email": "sally.smith@example.com",
      "name": "Sally Smith",
      "recipientId": "1",
      "routingOrder": "1"
    }]
  },
  "documents": [{
    "documentId": "1",
    "name": "test.pdf",
    "documentBase64": "<base64 encoded document bytes>"
  }],
  "status": "sent"
};

const accountId = '2041307';
request.post(`https://demo.docusign.net/restapi/v2/accounts/${accountId}/envelopes`, exampleTemplate)
.then((response) => {
  console.log('=======SUCCESS=======, ', response);
})
.catch((err) => {
  console.log('=========FAIL========, ', err);
});
