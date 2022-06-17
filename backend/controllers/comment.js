const Comment = require('../models/Comment');

exports.createComment = (req, res, netx) => {
        const comment = new Comment({
            post_id: req.body.post_id,
            user_id: req.body.user_id,
            content: req.body.content
        })
      comment.save()
        .then(() => res.status(201).json({
          message: 'Comment enregistré !'
        }))
        .catch(error => {
          res.status(400).json({
            error
          })
        });
};

exports.getAllComments = (req, res, netx) => {
    Comment.findAll()
    .then(comments => {
       res.send(comments);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getUserComments = (req, res, netx) => {
  Comment.findAll({where: {user_id: req.params.id}})
  .then(comment => {
     res.send(comment);
  })
  .catch(error => res.status(500).json({ error }));
};

exports.modifyComment = (req, res, netx) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
       comment.content = req.body.content;
       comment.save()
       .then(() => res.status(201).json({message: 'Comment modifié !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, netx) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
       comment.destroy()
       .then(() => res.status(201).json({message: 'Comment supprimé !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};