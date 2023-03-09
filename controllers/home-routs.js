const router = require('express').Router();
const { User, Posts } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model: Posts,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const galleries = userData.map((User) =>
      User.get({ plain: true })
    );
    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one User
router.get('/User/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Posts,
          attributes: [
            'id',
            'title',
            'body',
            'date',
            'time'
          ],
        },
      ],
    });

    const User = userData.get({ plain: true });
    res.render('User', { User, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Posts
router.get('/Posts/:id', async (req, res) => {
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
