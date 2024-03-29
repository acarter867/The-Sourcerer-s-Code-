const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");

// GET all Posts for homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const allPosts = await Posts.findAll({
      order: [["id", "DESC"]],
    });
    const posts = allPosts.map((project) => project.get({ plain: true }));
    if (req.session.logged_in) {
      res.render("homepage", {
        posts,
        username: req.session.username,
        logged_in: req.session.logged_in,
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET specific Post
router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id);

    const posts = postData.get({ plain: true });
    res.render("Posts", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Search by tag
router.get("/tags/:id", async (req, res) => {
  try {
    const tag = req.params.id;
    const [results, metadata] =
      await sequelize.query(`SELECT posts.id, posts.poster_id, user.username, posts.title, posts.body, tags.post_id, tags.title
        FROM posts, tags, user
        WHERE posts.id = tags.post_id
        AND user.id = posts.poster_id
        AND tags.title = "${tag}";`);
    if (!results) {
      res.status(400).json({
        message: "User does not exist, please edit your search and try again",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
