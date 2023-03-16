const router = require('express').Router();
const { Posts } = require('../../models');

// get new post page
router.get('/', async (req, res) => {
    try {
        if(req.session.logged_in) {
            res.render('new', {
                logged_in: true,
            });
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// New post
router.post('/', async (req, res) => {
    try {
        console.log('Req body full: ', req.body);
        // console.log('Title req:', req.body.title);
        // console.log('Body req: ', req.body.body);
        const postData = await Posts.create({
            title: req.body.title,
            body: req.body.body,
            poster_id: req.session.userId,
        });
        console.log('This is post data: ', postData);
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Posts.update(
            {
                title: req.body.title,
                body: req.body.body,
            },
            {
                where: {
                    id: req.params.id,
                    poster_id: req.session.userId,
                },
            },
        );
        if(!postData) {
            res.status(404).json({ message: 'Unable to update post.' });
            return;
        };
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete post
router.delete('/:id', async (req, res) => {
    try {
        const target = await Posts.destroy({
            where: {
                id: req.params.id,
                poster_id: req.session.userId,
            },
        });
        if (!target) {
            res.status(404).json({ message: 'Unable to delete post.' });
            return;
        };
        res.status(500).json(target);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;