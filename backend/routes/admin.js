const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');

router.get('/', adminCtrl.getAllUsers);
router.get('/:id', adminCtrl.getOneUser);
router.put('/:id', adminCtrl.modifyUser);
router.delete('/:id', adminCtrl.deleteUser);

module.exports = router;