const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');

router.post('/', likeCtrl.addLike);
router.delete('/:id', likeCtrl.deleteLike);

module.exports = router;