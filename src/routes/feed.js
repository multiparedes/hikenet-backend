const { Router } = require("express");
const router = Router();

const { getFeed } = require("../controllers/feed");

// Route for following a user
router.get("/:id", getFeed);

module.exports = router;
