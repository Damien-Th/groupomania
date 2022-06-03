const bcrypt = require('bcrypt');
const User = require('../models/User');
const func = require('../function');

exports.token = (req, res, next) => {
    const refreshToken = req.cookies['jwtRefresh'];
    if(refreshToken === null) return res.sendStatus(401)
    func.verifyToken(refreshToken, req, res)
};

// Authentification

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            user_img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    // .catch(error => res.status(500).json({ error }));
    .catch(error => res.status(500).json({ error, Message: req }));

};

exports.signin = (req, res, next) => {
    User.findOne({where: {email: req.body.email}})
    .then(user => {
        if(!user) return res.status(401).json({error: 'Utilisateur non trouvé !'});
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) return res.status(401).json({error: 'Mot de passe incorrect'});
            const token = func.createToken(user.id);
            const refreshToken = func.refreshToken(user.id);
            const setCookie = func.setCookie(res, refreshToken)
            setCookie.status(201).json({ message: 'Cookies created', accessToken : token})
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.signout = (req, res, next) => {
    res.clearCookie('jwt').status(200).json({ message: 'Cookie removed' }).end();
}