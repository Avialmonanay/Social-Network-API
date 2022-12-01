const router = require('express').Router();
const usersRoutes = require('./users');
const thoughtsRoutes = require('./thoughts');

//creates /api/users
router.use('/users', usersRoutes);
//creates /api/thoughts
router.use('/thoughts', thoughtsRoutes)

module.exports = router;