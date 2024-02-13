const { Router } = require("express");
const router = Router();
const queryUtils = require("../services/queryUtils");

router.get("/", async (req, res) => {
  const currentPage = req.query.page ?? 1;

  if (currentPage === "0") {
    res.status(400).json({ message: "The page should be greather than zero" });
    return;
  }

  try {
    const query = await queryUtils.getMultiple(
      "SELECT * FROM users",
      currentPage
    );
    res.json({
      message: `Information list`,
      ...query,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });

    return;
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const query = await queryUtils.getSingle(
      `SELECT * FROM users WHERE ID = ${req.params.id}`
    );

    res.json({
      message: `Information for user ${req.params.id}`,
      ...query,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
});

module.exports = router;
