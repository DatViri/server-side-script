'use strict';
const express = require('express');
const imageRouter = express.Router();
const multer = require('multer');
const controller = require('../controller/imageController');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});

imageRouter.post('/image', upload.single('picture'), controller.uploadImage);

imageRouter.get('/image/:id', controller.getImage);

imageRouter.put('/image/:id', controller.updateImage);

imageRouter.delete('/image/:id', controller.deleteImage);

imageRouter.get('/images', controller.getAllImage);

module.exports = imageRouter;


