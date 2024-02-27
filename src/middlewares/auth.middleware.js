const { verifyToken } = require("../utils/basicUtils");

function authMiddleware(req, res, next) {
  try {
    const headerToken = req.get("Authorization");

    console.log(headerToken);

    if (!headerToken) {
      return res
        .status(401)
        .json({ message: "No autorization header provided" });
    }

    const verified = verifyToken(headerToken);
    console.log("🚀 ~ authMiddleware ~ verified:", verified);

    if (verified && verified.exp * 1000 > Date.now()) {
      next();
    } else {
      res.status(401).json({ message: "Incorrect autorization cookie" });
    }
  } catch (error) {
    console.log("🚀 ~ authMiddleware ~ error:", error);
    res.status(401).json({ message: "Incorrect autorization cookie" });
  }
}

module.exports = { authMiddleware };
