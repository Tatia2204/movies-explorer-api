const router = require('express').Router();
const { getCurrentUser, getUserUpdate } = require('../controllers/users');
const { validationGetCurrentUser, validationGetUserUpdate } = require('../middlewares/validations');

router.get('/me', validationGetCurrentUser, getCurrentUser);
router.patch('/me', validationGetUserUpdate, getUserUpdate);

module.exports = router;
