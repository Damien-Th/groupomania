const Like = require('../models/Like');

exports.addLike = (req, res, netx) => {

        const likeRequest = (req.body)
        const likeObject = new Like({
            ...likeRequest
        })

        likeObject.save()
        .then(() => res.status(201).json({
          message: 'Like enregistré !'
        }))
        .catch(error => {
          res.status(400).json({
            error
          })
        });
};

exports.deleteLike = (req, res, netx) => {
    Like.findOne({where: {id: req.params.id}})
    .then(like => {
       like.destroy()
       .then(() => res.status(201).json({message: 'Like supprimé !'}))
       .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};