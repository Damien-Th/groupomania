const User = require('../models/User');
const Like = require('../models//Like');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

exports.getAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => res.send(users))
    .catch(error => res.status(500).json({ error }));
};

exports.getAllUsersSlug = (req, res, next) => {
    User.findAll({attributes: ['slug', 'id']})
    .then(users => res.send(users))
    .catch(error => res.status(500).json({ error }));
};

exports.getLastUser = (req, res, next) => {
    User.findAll({limit: 5, attributes: {exclude: ['password', 'is_admin']}, order: [ [ 'id', 'DESC' ]]})
    .then(users => res.send(users))
    .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
    .then(user => res.send(user))
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {

    User.findOne({where: {id: req.params.id}})
    .then(user => {
    if(user.id !== req.auth.userId) if(req.auth.isAdmin === false) return

       if(req.body.password) {
        bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            user.password = hash;
            user.save()
            .then(() => res.status(201).json({message: 'Utilisateur modifié !'}))
            .catch(error => res.status(400).json({ error }));
        })
       }
       if(!req.body.password) {
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.biography = req.body.biography
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json({ error }));
       }

     
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUserAvatar = (req, res, next) => {

    User.findOne({where: {id: req.params.id}})
    .then(user => {
        if(user.id !== req.auth.userId) if(req.auth.isAdmin === false) return
        if(user.image) {
            const imagePath = `images/user_${user.id}/avatar/${user.image}`
            if(fs.existsSync(imagePath)) {
              fs.unlink(imagePath, (err) => {
                if (err) {console.error(err)}
              })
            } 
          }
        user.image = req.file.filename;
        user.save().then(() => res.status(201).json({message: 'Avatar modifié !'}))
        .catch(error => res.status(400).json({ error }));       
    })
    .catch(error => res.status(500).json({ error }));
   
};

exports.makeAdmin = (req, res, next) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
    if(req.auth.isAdmin === false) return

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
    if(user.id !== req.auth.userId) if(req.auth.isAdmin === false) return
    const dir = `images/user_${req.params.id}`
    if(fs.existsSync(dir)) {
        fs.rmdir(dir, { recursive: true, force: true }, (err) => {
          if (err) {console.error(err)}
        })
      } 
       user.destroy()
       .then(() => {
        Like.destroy({ where: { user_id: null } })
        .then(() => res.status(201).json({message: 'Utilisateur supprimé !'}))
       })
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};