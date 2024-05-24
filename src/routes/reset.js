const { Router } = require("express");
const router = Router();

const {
  resetPassword,
  checkOTP,
  updatePassword,
} = require("../controllers/reset");

router.route("/check/:email").post(checkOTP);
router.route("/:email").post(resetPassword).patch(updatePassword);

module.exports = router;
