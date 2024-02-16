require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  return await bcrypt.hashSync(
    password,
    Number.parseInt(process.env.SALT_ROUNDS)
  );
}

function errorFunction(res) {
  return res.status(500).json({ message: "HELP! Something broke 🧯🔥" });
}

function generateToken(user) {
  return jwt.sign({ user: user }, process.env.AUTH_SECRET, {
    expiresIn: process.env.AUTH_EXPIRATION_TIME,
  });
}

function verifyToken(token) {
  let validtoken = false;

  jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
    validtoken = decoded;
  });

  return validtoken;
}

module.exports = { hashPassword, errorFunction, generateToken, verifyToken };
