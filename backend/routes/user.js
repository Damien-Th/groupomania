const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get('/',auth, userCtrl.getAllUsers);
router.get('/last',auth, userCtrl.getLastUser); 
router.get('/slug',auth, userCtrl.getAllUsersSlug); 
router.get('/:id',auth, userCtrl.getOneUser);
router.put('/active/:id',auth, userCtrl.makeAdmin); 
router.put('/:id',auth, userCtrl.modifyUser);
router.put('/avatar/:id',auth, multer, userCtrl.modifyUserAvatar);
router.delete('/:id',auth, userCtrl.deleteUser);

module.exports = router;

