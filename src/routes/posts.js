const { Router } = require("express");
const router = Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  getAllUserPosts,
} = require("../controllers/posts");

router.route("/").get(getAllPosts);

router.route("/user/:username").get(getAllUserPosts);

router.route("/:user").post(createPost).get(getPost);

router.route("/:user/:id").patch(updatePost);

module.exports = router;
