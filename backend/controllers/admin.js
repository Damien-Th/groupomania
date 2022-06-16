const User = require('../models/User');
require('dotenv').config()

// CRUD Admin

exports.getAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
       res.send(users);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
       res.send(user);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
    //    user.last_name = req.body.lastname;
       user.is_admin = req.body.is_admin;
       user.save()
       .then(() => res.status(201).json({message: 'Utilisateur modifié !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
       user.destroy()
       .then(() => res.status(201).json({message: 'Utilisateur supprimé !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};