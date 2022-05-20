const bcrypt = require('bcrypt');
const User = require('../models/User');
const func = require('../function');
require('dotenv').config()
const maxAge = parseInt(process.env.MAXAGE) * 60 * 60 * 1000;

// Authentification

exports.signup = (req, res, netx) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.signin = (req, res, netx) => {
    User.findOne({where: {email: req.body.email}})
    .then(user => {
        if(!user) return res.status(401).json({error: 'Utilisateur non trouvé !'});
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) return res.status(401).json({error: 'Mot de passe incorrect'});
            const token = func.createToken(user.id);
            res.cookie('jwt', token, {httpOnly: true, maxAge, secure: false}).status(200).json({ userId: user.id })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.signout = (req, res, netx) => {

    res.clearCookie('jwt').status(200).json({ message: 'Cookie removed' }).end();
}