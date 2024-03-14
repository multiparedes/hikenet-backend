const { Router } = require("express");
const router = Router();

const { getAllPosts } = require("../controllers/posts");

router.get("/:user", getAllPosts);

//router.get("/:user/:id", unfollowUser);

module.exports = router;
