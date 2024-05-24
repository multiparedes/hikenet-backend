const { User, Post } = require("../models");
const { Op } = require("sequelize");

async function getAllPosts(req, res) {
  const posts = await Post.findAll();

  res.json(posts);
}

async function createPost(req, res) {
  const username = req.params?.user;
  console.log(req.body);

  try {
    const user = await User.findOne({
      where: { username: username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the post
    const post = await Post.create({
      ...req.body,
      userId: user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ errors: error.message.split("\n") });
  }
}

async function getPost(req, res) {
  const id = req.params?.user;

  const post = await Post.findByPk(id, {
    include: User,
  });

  if (post) {
    return res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}

async function updatePost(req, res) {
  const postId = req.params?.id;

  const {
    title,
    description,
    location,
    contents,
    difficulty,
    images,
    itinerary,
  } = req.body;

  try {
    const user = await User.findOne({
      where: { username: username },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.update({
      title,
      description,
      location,
      contents,
      difficulty,
      images,
      itinerary,
    });

    res.json(post);
  } catch (error) {
    res.status(400).json({ errors: error.message.split("\n") });
  }
}

async function getAllUserPosts(req, res) {
  try {
    const username = req.params.username;

    // Assuming User and Post are Sequelize models
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.findAll({
      where: { userId: user.id },
    });

    res.json(posts);
  } catch (error) {
    console.error("Error retrieving user posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  getPost,
  getAllUserPosts,
};
