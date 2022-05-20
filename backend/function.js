require('dotenv').config()
const  jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY;
const MAXAGE = process.env.MAXAGE;

exports.createToken = (id) => {
   return jwt.sign({id}, SECRETKEY, {
    expiresIn: MAXAGE
   })
};
