const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');


// CRUD

exports.getAllUsers = (req, res, netx) => {
    User.findAll()
    .then(users => {
       res.send(users);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, netx) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
       res.send(user);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, netx) => {

    User.findOne({where: {id: req.params.id}})
    .then(user => {
       bcrypt.hash(req.body.password, 10)
       .then((hash) => {
        user.email = req.body.email;
        user.password = hash;
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, netx) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
       user.destroy()
       .then(() => res.status(201).json({message: 'Utilisateur supprimé !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};