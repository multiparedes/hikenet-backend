const { User, Post } = require("../models");

async function getAllPosts(req, res) {
  const username = req.params?.user;

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

async function createPost(req, res) {
  const username = req.params?.user;

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

    const post = await Post.create({
      title,
      description,
      location,
      contents,
      difficulty,
      images,
      itinerary,
      userId: user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ errors: error.message.split("\n") });
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

module.exports = { getAllPosts, createPost, updatePost };
