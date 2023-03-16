const router = require("express").Router();
const { Comments } = require("../../models");

// new comment
router.post("/:id", async (req, res) => {
  try {
    const commentData = await Comments.create({
      body: req.body.body,
      poster_id: req.session.userId,
      poster_username: req.session.username,
      parent_id: req.params.id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// edit comment
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comments.update(
      {
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
          poster_id: req.session.userID,
        },
      }
    );
    if (commentData) {
      res.status(404).json({ message: "Unable to update comment." });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const target = await Comments.destroy({
      where: {
        id: req.params.id,
        poster_id: req.session.userId,
      },
    });
    if (!target) {
      res.status(404).json({ message: "Unable to delete comment." });
      return;
    }
    res.status(200).json(target);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
