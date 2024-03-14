const { User, Post } = require("../models");

async function getAllPosts(req, res) {
  const username = req.params.user;

  const user = await User.findOne({
    where: { username: username },
    include: {
      model: Post,
      as: "posts",
    },
  });

  if (user) {
    res.json(user.posts);
  } else {
    res.status(404).json({ message: "User not found" });
  }
}

module.exports = { getAllPosts };
