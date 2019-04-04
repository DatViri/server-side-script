const express = require('express');
const bodyParser = require('body-parser');
const imageRouter = require('./router/imageRouter');
const userRouter = require('./router/userRouter');
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

// Connect DB
mongoose.connect(url).then(()=>{
  console.log('Connected successfully.');
  app.listen(process.env.PORT);
}, (err) => {
  console.log('Connection to db failed: ' + err);
});

// API
app.use('/api', imageRouter);
app.use('/api/users', userRouter);
// app.enable('trust proxy');

// Enable HTTPS
// app.use((req, res, next) => {
//   if (req.secure) {
//     // request was via https, so do no special handling
//     next();
//   } else {
//     // request was via http, so redirect to https
//     res.redirect('https://' + req.headers.host + req.url);
//   }
// });

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

