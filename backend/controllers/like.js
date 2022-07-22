const Like = require('../models/Like');

exports.handleLike = (req, res, next) => {
  Like.findOne({where: {type: req.body.type, type_id: req.body.type_id, user_id: req.body.user_id}})
  .then(like => {

    if(req.body.user_id !== req.auth.userId) return

    if(like === null) {
      const likeRequest = (req.body)
      delete likeRequest.id;
      const likeObject = new Like({
        type: req.body.type,
        type_id: req.body.type_id,
        user_id: req.body.user_id,
      })
  
      likeObject.save()
      .then(() => res.status(201).json({message: 'Like enregistré !'}))
      .catch(error => {res.status(400).json({error})});
    }

    if(like !== null) {
      like.destroy()
      .then(() => res.status(201).json({message: 'Like supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    }

 })
 .catch(error => res.status(500).json({ error }));
};

exports.postLike = (req, res, next) => {
  Like.findAndCountAll({where: {type_id: req.params.id, type: 'Post'}})
  .then((count) => res.status(201).json({count}))
  .catch(error => res.status(500).json({ error }));
};

exports.commentLike = (req, res, next) => {
  Like.findAndCountAll({where: {type_id: req.params.id, type: 'Comment'}})
  .then((count) => res.status(201).json({count}))
  .catch(error => res.status(500).json({ error }));
};