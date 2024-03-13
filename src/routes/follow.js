const { Router } = require("express");
const router = Router();

const { followUser, unfollowUser } = require("../controllers/follow");

// Route for following a user
router.post("/follow/:id", followUser);

// Route for unfollowing a user
router.post("/unfollow/:id", unfollowUser);

module.exports = router;
