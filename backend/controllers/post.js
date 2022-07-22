const Post = require('../models/Post');
const User = require('../models/User');
const func  = require('../function');
fs = require('fs');

exports.createPost = (req, res, next) => {

  let imageName;
  req.file === undefined ? imageName = req.body.image : imageName = req.file.filename

  const post = new Post({
      content: req.body.content,
      image: imageName,
      user_id: req.body.user_id
  })
  post.save()
    .then(() => res.status(201).json({ 
      message: 'Post cré !',
      post
    }))
    .catch(error => {
      res.status(400).json({
        error
      })
    });
};

exports.getAllPosts = (req, res, next) => {

  Post.findAll({ include: {model: User, attributes: {exclude: ['password', 'email']} }, order: [["createdAt", "DESC"]] })
    .then(allPost => res.send(allPost))
    .catch(error => res.status(500).json({ error }));
};

exports.getUserPosts = (req, res, next) => {

  Post.findAll({ include: {model: User, where: {id: req.params.id}, attributes: {exclude: ['password']} }, order: [["createdAt", "DESC"]] })
    .then(allPost => res.send(allPost))
    .catch(error => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
       res.send(post);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyPostText = (req, res, next) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
      if(post.user_id !== req.auth.userId) if(req.auth.isAdmin === false) return
       post.content = req.body.content;
       post.save()
       .then(() => res.status(201).json({message: 'Texte du Poste modifié !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyPostImage = (req, res, next) => {
  Post.findOne({where: {id: req.params.id}})
  .then(post => {
    if(post.user_id !== req.auth.userId) if(req.auth.isAdmin === false) return
    let imageName;
    req.file === undefined ? imageName = req.body.image : imageName = req.file.filename;
    if(!imageName || post.image !== imageName) {
      const imagePath = `images/user_${post.user_id}/post/${post.image}`
      if(fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {console.error(err)}
        })
      } 
    }
    post.image = imageName;
     post.save()
     .then(() => res.status(201).json({
      message: 'Image du Poste modifié !',
      post
    }))
     .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
      if(post.user_id !== req.auth.userId) if(req.auth.isAdmin === false) return
      if(post.image) {
        const imagePath = `images/user_${post.user_id}/post/${post.image}`
        if(fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) {console.error(err)}
          })
        } 
      }
       post.destroy()
       .then(() => res.status(201).json({message: 'Post supprimé !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};