const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');

router.get('/post/:id', likeCtrl.postLike);
router.get('/comment/:id', likeCtrl.commentLike);
router.post('/', likeCtrl.handleLike);
router.delete('/:id', likeCtrl.deleteLike);

module.exports = router;