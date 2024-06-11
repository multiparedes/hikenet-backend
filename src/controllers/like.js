const { Like, User, Post } = require("../models");

async function likePost(req, res) {
  const { id, userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(id);

    if (!user || !post) {
      return res.status(404).json({ message: "User or Post not found" });
    }

    const [like, created] = await Like.findOrCreate({
      where: { userId: user.id, postId: post.id },
    });

    if (!created) {
      return res
        .status(400)
        .json({ message: "User has already liked this post" });
    }

    return res.status(201).json(like);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function unlikePost(req, res) {
  const { id, userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(id);

    if (!user || !post) {
      return res.status(404).json({ message: "User or Post not found" });
    }

    // Check if the user has liked the post
    const like = await Like.findOne({
      where: { userId: user.id, postId: post.id },
    });

    if (!like) {
      return res.status(400).json({ message: "User has not liked this post" });
    }

    // Delete the like
    await like.destroy();

    return res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { likePost, unlikePost };
