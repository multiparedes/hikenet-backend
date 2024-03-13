const { Router } = require("express");
const router = Router();

const {
  getProfile,
  postProfile,
  patchProfile,
} = require("../controllers/profiles");

router.route("/:id").get(getProfile).post(postProfile).patch(patchProfile);

module.exports = router;
