const router = require('express').Router();

const userRoutes = require('./user-routes');
const userPosts = require('./userpost-routes');

router.use('/users', userRoutes);
router.use('/posts', userPosts);

module.exports = router;