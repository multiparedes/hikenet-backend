const { Router } = require("express");
const router = Router();

require("dotenv").config();

// DEVELOP, CREATE FAKE DATA
// const { faker } = require("@faker-js/faker");

// Import the sequelize table
const { User } = require("../models");

const { hashPassword, errorFunction } = require("../utils/basicUtils");

//Define get
router.get("/", getAllUser);

async function getAllUser(req, res) {
  try {
    const users = await User.findAll();

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

router.route("/:id").get(getUser).patch(patchUser).delete(deleteUser);

module.exports = router;

/*
async function postFakeUser(req, res) {
  try {
    const password = faker.internet.password();
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username: faker.internet.userName(),
      password: hashedPassword,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      isAdmin: faker.datatype.boolean(),
    });

    res.json(newUser);
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}*/
