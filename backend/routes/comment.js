const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

router.post('/', commentCtrl.createComment)
router.get('/', commentCtrl.getAllComments);
router.get('/:id', commentCtrl.getOneComments);
router.get('/post/:id', commentCtrl.getPostComments);
router.get('/user/:id', commentCtrl.getUserComments);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;