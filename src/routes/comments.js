const { Router } = require("express");
const router = Router();

const { postComment } = require("../controllers/comments");

// Route for following a user
router.post("/:id/:post", postComment);

module.exports = router;
