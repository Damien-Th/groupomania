require('dotenv').config()
const  jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY;
const REFRESH_SECRETKEY = process.env.REFRESH_SECRETKEY;
const MAXAGE = process.env.MAXAGE;
const REFRESH_MAXAGE = process.env.REFRESH_MAXAGE;
const MAXAGE_COOKIES = parseInt(process.env.MAXAGE_COOKIES) * 60 * 60 * 1000;

// JsonWebToken

exports.createToken = (id, isAdmin) => {
   return jwt.sign({id, isAdmin}, SECRETKEY, {
    expiresIn: MAXAGE,
   })
};

exports.refreshToken = (id, isAdmin) => {
   return jwt.sign({id, isAdmin}, REFRESH_SECRETKEY, {
      expiresIn: REFRESH_MAXAGE,
   })
};

exports.verifyToken = (refreshToken, req, res) => {
   return jwt.verify(refreshToken, REFRESH_SECRETKEY , (err, user) => {
      if(err) return res.sendStatus(403)
      const accessToken = this.createToken(user.id, user.isAdmin)
      res.setHeader('Authorization', 'Bearer ' + accessToken).status(200).json({ Message: 'token refreshed', accessToken : accessToken })
  })
};

exports.setCookie = (res, refreshToken) => {
   return res.cookie('jwtRefresh', refreshToken, {httpOnly: true, maxAge: MAXAGE_COOKIES, secure: false})
};

// Associations

exports.belongsTo = (tab1, tab2, key) => {
   return tab1.belongsTo(tab2, { foreignKey: key });
}

exports.hasMany = (tab1, tab2, key) => {
   return tab1.hasMany(tab2, { foreignKey: key }),
   tab2.belongsTo(tab1, { foreignKey: key });
}