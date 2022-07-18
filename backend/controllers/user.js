const User = require('../models/User');
const Like = require('../models//Like');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// CRUD

exports.getAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
       res.send(users);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllUsersSlug = (req, res, next) => {
    User.findAll({attributes: ['slug', 'id']})
    .then(users => {
       res.send(users);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getLastUser = (req, res, next) => {
    User.findAll({limit: 5, attributes: {exclude: ['password', 'id', 'is_admin']}, order: [ [ 'id', 'DESC' ]]})
    .then(users => {
       res.send(users);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
    .then(user => {
       res.send(user);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {

    User.findOne({where: {id: req.params.id}})
    .then(user => {
       bcrypt.hash(req.body.password, 10)
       .then((hash) => {
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.biography = req.body.biography
        user.email = req.body.email;
        user.password = hash;
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUserImage = (req, res, next) => {

  
};

exports.makeAdmin = (req, res, next) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
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
    const dir = `images/user_${req.params.id}`
    if (fs.existsSync(dir)) fs.rmdir(dir, { recursive: true, force: true });

       user.destroy()
       .then(() => {
        Like.destroy({ where: { user_id: null } })
        .then(() => res.status(201).json({message: 'Utilisateur supprimé !'}))
       })
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};