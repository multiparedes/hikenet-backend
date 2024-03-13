const { Router } = require("express");
const router = Router();

const {
  getUser,
  patchUser,
  deleteUser,
  getAllUser,
} = require("../controllers/users");

router.get("/", getAllUser);

router.route("/:id").get(getUser).patch(patchUser).delete(deleteUser);

module.exports = router;
