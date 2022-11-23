const router = require('express').Router();
const friendsRoutes = require('./friends');
const usersRoutes = require('./users');
const reactionsRoutes = require('./reactions');
const thoughtsRoutes = require('./thoughts');

router.use('/friends', friendsRoutes);
router.use('/users', usersRoutes);
router.use('/reactions', reactionsRoutes);
router.use('/thoughts', thoughtsRoutes)

module.exports = router;