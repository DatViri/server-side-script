const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/imageRouter');
const mongoose = require('mongoose');

require('./model/userModel');
require('dotenv').config();
require('./config/passport');


const url = process.env.DB_URL;
const app = express();


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({secret: 'week2',
  cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

// Connect DB
mongoose.connect(url).then(()=>{
  console.log('Connected successfully.');
  app.listen(process.env.PORT);
}, (err) => {
  console.log('Connection to db failed: ' + err);
});

// API
app.use('/api', router);
app.use('/api', router);

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

