const { verifyToken } = require("../utils/basicUtils");

function authMiddleware(req, res, next) {
  try {
    const headerToken = req.cookies["auth._token.cookie"];

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
        .clearCookie("auth._token.cookie")
        .status(401)
        .json({ message: "Incorrect autorization cookie" });
    }
  } catch (error) {
    console.log("🚀 ~ authMiddleware ~ error:", error);
    res
      .clearCookie("auth._token.cookie")
      .status(401)
      .json({ message: "Incorrect autorization cookie" });
  }
}

module.exports = { authMiddleware };
