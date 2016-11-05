const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/publicServed')));
// app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(app.get('port'));
console.log('Listening to port... ', app.get('port'));
