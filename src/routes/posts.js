const { Router } = require("express");
const router = Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  getAllUserPosts,
} = require("../controllers/posts");

const { likePost, unlikePost } = require("../controllers/like");

router.route("/").get(getAllPosts);

router.route("/user/:username").get(getAllUserPosts);

router.route("/:user").post(createPost).get(getPost);

router.route("/:id").patch(updatePost);

router.route("/:id/likes/:userId").post(likePost).delete(unlikePost);

module.exports = router;
