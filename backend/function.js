require('dotenv').config()
const  jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY;
const MAXAGE = process.env.MAXAGE;
const MAXAGE_COOKIES = parseInt(process.env.MAXAGE_COOKIES) * 60 * 60 * 1000;

// JsonWebToken

exports.createToken = (id, isAdmin) => {
   return jwt.sign({id, isAdmin}, SECRETKEY, {
    expiresIn: MAXAGE,
   })
};

exports.verifCookie = (Token, req, res) => {
   return jwt.verify(Token, SECRETKEY , (err, user) => {
      if(err) return res.sendStatus(403)
      res.setHeader('Authorization', 'Bearer ' + Token)
      res.status(200).json({ Message: 'Got your token back', accessToken : Token })
  })
};

exports.setCookie = (res, refreshToken) => {
   return res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: MAXAGE_COOKIES, secure: false})
};

exports.clearCookies = (res, token) => {
   return res.cookie('jwt', token, {httpOnly: true, maxAge: 0, secure: false})
};

// Associations

exports.belongsTo = (tab1, tab2, key) => {
   return tab1.belongsTo(tab2, { foreignKey: key });
}

exports.hasMany = (tab1, tab2, key, action) => {
   return tab1.hasMany(tab2, { foreignKey: key, onDelete: action, }),
   tab2.belongsTo(tab1, { foreignKey: key });
}