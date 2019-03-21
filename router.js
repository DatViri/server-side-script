'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('./imageController');

const upload = multer({limits: {fileSize: 1000000}, dest: 'public/uploads/'});

router.post('/image', upload.single('picture'), controller.uploadImage);

router.get('/image/:id', controller.getImage);

router.get('/images', controller.getAllImage);

module.exports = router;


