require("dotenv").config();

const { User } = require("../models");
const { Op } = require("sequelize");

const { hashPassword, errorFunction } = require("../utils/basicUtils");

async function getAllUser(req, res) {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.substring]: req.query?.name ?? "" } },
          { firstName: { [Op.substring]: req.query?.name ?? "" } },
          { lastName: { [Op.substring]: req.query?.name ?? "" } },
        ],
      },
    });

    res.json(users);
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findOne({
      where: { username: req.params?.id },
      include: "profile",
    });

    res.json(user ?? { message: "User not found 😞" });
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await User.destroy({
      where: {
        username: req.params?.id,
      },
    });

    res.json(
      deletedUser == 0
        ? { message: "User not found 😞" }
        : { message: "User deleted successfully 😃" },
    );
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function patchUser(req, res) {
  try {
    let { password } = req.body;

    if (password) {
      password = await hashPassword(password);
    }

    const user = await User.findOne({
      where: { username: req.params?.id },
    });

    if (!user) {
      res.json({ message: "User not found 😞" });
    }

    const updatedUser = await user.update({
      ...req.body,
      password,
    });

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

module.exports = {
  getAllUser,
  getUser,
  patchUser,
  deleteUser,
};
