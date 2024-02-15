const { verifyToken } = require("../utils/basicUtils");

function authMiddleware(req, res, next) {
  try {
    const headerToken = req.cookies["hikenet-token"];

    if (!headerToken) {
      return res
        .status(401)
        .json({ message: "No autorization cookie provided" });
    }

    const verified = verifyToken(headerToken);
    console.log("🚀 ~ authMiddleware ~ verified:", verified);

    if (verified) {
      next();
    } else {
      res
        .clearCookie("hikenet-token")
        .status(401)
        .json({ message: "Incorrect autorization cookie" });
    }
  } catch (error) {
    console.log("🚀 ~ authMiddleware ~ error:", error);
    res
      .clearCookie("hikenet-token")
      .status(401)
      .json({ message: "Incorrect autorization cookie" });
  }
}

module.exports = { authMiddleware };
