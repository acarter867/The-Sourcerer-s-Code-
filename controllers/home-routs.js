const router = require('express').Router();
const { User, Posts } = require('../models');

// GET all Posts for homepage
router.get('/', async (req, res) => {
  try {
    console.info("aslifhjasdjklhfkasdjhasdfhjsadhjk");
    const allPosts = await Posts.findAll();

    const posts = postData.map((allPosts) =>
      Posts.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET specific Post
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id);

    const Posts = postData.get({ plain: true });
    res.render('Posts', { Posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
