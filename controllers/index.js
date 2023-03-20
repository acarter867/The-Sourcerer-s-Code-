const router = require("express").Router();

//define api & home routes
const apiRoutes = require("./api");
const homeRoutes = require("./home-routs.js");

//Use / and /api routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
