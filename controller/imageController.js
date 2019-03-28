'use strict';
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;
const imageModel = require('../model/imageModel');
const sharp = require('sharp');

exports.uploadImage = (req, res)=> {
  if (req.file == null) {
    res.render('Please select a picture file to submit!');
  } else {
    const fileName = Date.now() + '.png';
    const fileSave = './public/uploads/small/' + fileName;
    console.log(Date.now());
    sharp(req.file.path).resize(200).toFile(fileSave).then((data) => {
      //const newImg = fs.readFileSync(fileSave);
      //const encImg = newImg.toString('base64');
      console.log('file path ' + req.file.path);
      const newItem = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        contentType: req.file.mimeType,
        size: req.file.size,
        //image: new Buffer(encImg),
        image: fileName,
      };
      imageModel.create(newItem).then(() => {
        console.log(newItem);
        res.send(newItem);
      });
    }).catch((err) => {
      console.log(err);
    });
  }
};

exports.getImage = (req, res) =>{
  const id = req.params.id;
  imageModel.findById({'_id': ObjectId(id)}, (err, result)=>{
    //res.contentType('image/jpeg');
    //res.send(Buffer.from(result.image, 'base64'));
    console.log(result);
    res.json(result);
  });
};

exports.getAllImage = (req, res) =>{
  imageModel.find({}, (err, result)=>{
    if (err) throw err;
    // object of all the users
    res.send(result);
  });
};

exports.updateImage = (req, res) =>{
  const filename = req.params.id;
  imageModel.findOneAndUpdate({'_id': ObjectId(filename)},
      req.body, {new: true}, (err, result) =>{
        if (err) throw err;
        res.json(result);
      });
};

exports.deleteImage = (req, res) =>{
  const filename = req.params.id;
  imageModel.remove({'_id': ObjectId(filename)}, (err, task) =>{
    if (err) throw err;
    res.json({message: 'Task successfully deleted'});
  });
};

