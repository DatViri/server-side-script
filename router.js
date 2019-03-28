'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('./imageController');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'public/uploads/original');
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});

router.post('/image', upload.single('picture'), controller.uploadImage);

router.get('/image/:id', controller.getImage);

router.get('/images', controller.getAllImage);

module.exports = router;


