const Comment = require('../models/Comment');
const User = require('../models/User');

exports.createComment = (req, res, next) => {
        const comment = new Comment({
            content: req.body.content,
            image: null,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
      comment.save()
        .then((comment) => res.status(201).json({
          message: 'Comment enregistré !',
          comment
        }))
        .catch(error => res.status(400).json({error}));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({ include: {model: User, attributes: {exclude: ['password', 'email']} } })
    .then(comments => {
       res.send(comments);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneComments = (req, res, next) => {
  Comment.findOne({where: {id: req.params.id}})
  .then((comment) => res.status(201).json({comment}))
  .catch(error => res.status(500).json({ error }));
};

exports.getPostComments = (req, res, next) => {
  Comment.count({where: {post_id: req.params.id}})
  .then((count) => res.status(201).json({count}))
  .catch(error => res.status(500).json({ error }));
};

exports.getUserComments = (req, res, next) => {
  Comment.findAll({where: {user_id: req.params.id}})
  .then(comment => {
     res.send(comment);
  })
  .catch(error => res.status(500).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
    if(comment.user_id !== req.auth.userId) if(req.auth.isAdmin === false) return

       comment.content = req.body.content;
       comment.save()
       .then(() => res.status(201).json({message: 'Comment modifié !', comment}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
    if(comment.user_id !== req.auth.userId) if(req.auth.isAdmin === false) return

       comment.destroy()
       .then(() => res.status(201).json({message: 'Comment supprimé !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};