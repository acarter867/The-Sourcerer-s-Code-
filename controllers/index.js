const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routs.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes0);

module.exports = router;