const { Router } = require("express");
const router = Router();

const { getAllPosts, createPost, updatePost } = require("../controllers/posts");

router.route("/:user").get(getAllPosts).post(createPost);

router.route("/:user/:id").patch(updatePost);

module.exports = router;
