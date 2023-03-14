const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./userpost-routes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);

module.exports = router;