const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get('/', userCtrl.getAllUsers);
router.get('/last',auth, userCtrl.getLastUser); 
router.put('/active/:id', userCtrl.makeAdmin); 
router.get('/slug', userCtrl.getAllUsersSlug); 
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.modifyUser);
router.put('/avatar/:id',multer, userCtrl.modifyUserAvatar);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;

