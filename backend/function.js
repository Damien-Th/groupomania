require('dotenv').config()
const  jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY;
const REFRESH_SECRETKEY = process.env.REFRESH_SECRETKEY;
const MAXAGE = process.env.MAXAGE;
const REFRESH_MAXAGE = process.env.REFRESH_MAXAGE;
const MAXAGE_COOKIES = parseInt(process.env.MAXAGE_COOKIES) * 60 * 60 * 1000;

exports.createToken = (id) => {
   return jwt.sign({id}, SECRETKEY, {
    expiresIn: MAXAGE,
   })
};

exports.refreshToken = (id) => {
   return jwt.sign({id}, REFRESH_SECRETKEY, {
      expiresIn: REFRESH_MAXAGE,
   })
};

exports.verifyToken = (refreshToken, req, res) => {
   return jwt.verify(refreshToken, REFRESH_SECRETKEY , (err, user) => {
      console.log(err)
      if(err) return res.sendStatus(403)
      const accessToken = this.createToken(user.id)
      res.setHeader('Authorization', 'Bearer ' + accessToken).status(200).json({ Message: 'token refreshed' })
  })
};

exports.setCookie = (res, refreshToken) => {
   return res.cookie('jwtRefresh', refreshToken, {httpOnly: true, maxAge: MAXAGE_COOKIES, secure: false})
};