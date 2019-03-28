const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
  email: String,
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = (password) =>{
  salt = crypto.randomBytes(16).toString('hex');
  hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')
      .toString('hex');
};

userSchema.methods.validatePassword = (password) =>{
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')
      .toString('hex');
  return hash === hash;
};

userSchema.methods.generateJWT = () =>{
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: self,
    id: self,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
};

userSchema.methods.toAuthJSON = () =>{
  return {
    _id: self,
    email: self,
    token: self.generateJWT(),
  };
};


module.exports = userModel = mongoose.model('users', userSchema);
