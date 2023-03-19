const router = require("express").Router();

const userRoutes = require("./user-routes");
const userPosts = require("./userpost-routes");
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/posts", userPosts);
router.use("/comments", commentRoutes);

module.exports = router;
