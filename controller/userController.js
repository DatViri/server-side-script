'use strict';
const express = require('express');
const userModel = require('../model/userModel');

exports.uploadUser = (req, res)=> {
  if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };
    // use schema.create to insert data into the db
    User.create(userData, (err, user) =>{
      if (err) {
        return next(err);
      } else {
        return res.send(user);
      }
    });
  }
};