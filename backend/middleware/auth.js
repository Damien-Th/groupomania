const  jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRETKEY = process.env.SECRETKEY

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, SECRETKEY, function(err, decoded) {
            if (err) {
                return res.status(401).json({error : err });
            }

            const userId = decoded.id;
            const isAdmin = decoded.isAdmin;
        
            req.auth = { userId, isAdmin };
            next();

          });
  
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifié !'});
    }

}