const { User, Post, Comment } = require("../models");

async function postComment(req, res) {
  const { id: userId, post: postId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    const user = await User.findOne({ where: { username: userId } });
    const post = await Post.findByPk(postId);

    if (!user || !post) {
      return res.status(400).json({ message: "Invalid post or user IDs" });
    }

    const comment = await Comment.create({
      text,
      userId: user.username,
      postId: post.id,
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { postComment };
