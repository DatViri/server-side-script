'use strict';
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;
const imageModel = require('./imageModel');
const sharp = require('sharp');

exports.uploadImage = (req, res)=> {
  if (req.file == null) {
    res.render('Please select a picture file to submit!');
  } else {
    const fileSave = './public/uploads/small/' + req.file.name;
    sharp(req.file.path).resize(200).toFile(fileSave).then((data) => {
      const newImg = fs.readFileSync(fileSave);
      const encImg = newImg.toString('base64');
      console.log('file path ' + req.file.path);
      const newItem = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        contentType: req.file.mimeType,
        size: req.file.size,
        image: new Buffer(encImg),
      };
      imageModel.create(newItem).then(() => {
        console.log(newItem);
        res.redirect('/');
      });
    }).catch((err) => {
      console.log(err);
    });
  }
};

exports.getImage = (req, res) =>{
  const filename = req.params.id;
  imageModel.findById({'_id': ObjectId(filename)}, (err, result)=>{
    res.contentType('image/jpeg');
    res.send(Buffer.from(result.image, 'base64'));
    console.log(Buffer.from(result.image, 'base64'));
  });
};

exports.getAllImage = (req, res) =>{
  imageModel.find({}, (err, result)=>{
    if (err) throw err;
    // object of all the users
    res.send(result);
  });
};
