const router = requre("express").Router();
const { User, Posts, Tags } = require("../../models");

// Search by userName
router.get("/users/:userName", async (req, res) => {
  console.log("hello");
  try {
    const searchedUser = User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!searchedUser) {
      res.status(400).json({
        message: "User does not exist, please edit your search and try again",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
