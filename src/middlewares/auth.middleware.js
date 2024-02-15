const { verifyToken } = require("../utils/basicUtils");

function authMiddleware(req, res, next) {
  try {
    const headerToken = req.headers.authorization;

    if (!headerToken) {
      return res
        .status(401)
        .json({ message: "No autorization header provided" });
    }

    const verified = verifyToken(headerToken);

    if (verified) {
      next();
    } else {
      res.status(401).json({ message: "Incorrect autorization header" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { authMiddleware };
