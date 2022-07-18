const bcrypt = require('bcrypt');
const User = require('../models/User');
const func = require('../function');

exports.token = (req, res, next) => {
    const refreshToken = req.cookies['jwtRefresh'];
    console.log(refreshToken)
    if(refreshToken === null || refreshToken === undefined) return res.status(401).json({ Message: 'Token Missing in the Cookie' })
    func.verifyToken(refreshToken, req, res)
};

exports.clear = (req, res, next) => {
    const token = req.cookies['jwtRefresh'];
    if(token === null) return res.status(401).json({ Message: 'Token Missing in the Cookie' })
    const verifToken = ''
    const setCookie = func.clearCookies(res, verifToken)
    setCookie.status(201).json({ message: 'Cookies expired'})
};

// Authentification

exports.signup = (req, res, next) => {
    const lastname = req.body.lastName.replace(/\s/g, '').toLowerCase();
    const firstName = req.body.firstName.replace(/\s/g, '').toLowerCase();
    const slug = firstName + lastname + Math.floor(Math.random() * 9999)
 
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            last_name: req.body.lastName,
            first_name: req.body.firstName,
            slug: slug,
        })
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};

exports.signin = (req, res, next) => {
    User.findOne({where: {email: req.body.email}})
    .then(user => {
        if(!user) return res.status(401).json({error: 'Utilisateur non trouvé !'});
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) return res.status(401).json({error: 'Mot de passe incorrect'});
            const token = func.createToken(user.id, user.is_admin);
            const refreshToken = func.refreshToken(user.id, user.is_admin);
            const setCookie = func.setCookie(res, refreshToken)
            setCookie.status(201).json({ message: 'Cookies created', accessToken : token, userId: user.id})
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.signout = (req, res, next) => {
    res.clearCookie('jwt').status(200).json({ message: 'Cookie removed' }).end();
}