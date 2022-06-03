const  jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRETKEY = process.env.SECRETKEY

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decondedToken = jwt.verify(token, SECRETKEY);
        const userId = decondedToken.userId;
        req.auth = { userId };
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        }else {
            next();
        }
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifié !'});
    }

}