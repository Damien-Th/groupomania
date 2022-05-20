const Post = require('../models/Post');

exports.createPost = (req, res, netx) => {
        const post = new Post({
            user_id: req.body.user_id,
            content: req.body.content
        })
      post.save()
        .then(() => res.status(201).json({
          message: 'Post enregistré !'
        }))
        .catch(error => {
          res.status(400).json({
            error
          })
        });
};

exports.getAllPosts = (req, res, netx) => {
    Post.findAll()
    .then(posts => {
       res.send(posts);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, netx) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
       res.send(post);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyPost = (req, res, netx) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
       post.content = req.body.content;
       post.save()
       .then(() => res.status(201).json({message: 'Post modifié !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deletePost = (req, res, netx) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
       post.destroy()
       .then(() => res.status(201).json({message: 'Post supprimé !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};