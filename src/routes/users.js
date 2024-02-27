const { Router } = require("express");
const router = Router();

require("dotenv").config();

// DEVELOP, CREATE FAKE DATA
// const { faker } = require("@faker-js/faker");

// Import the sequelize table
const Users = require("../models/users.model");

const { hashPassword, errorFunction } = require("../utils/basicUtils");

//Define get
router.get("/", getAllUsers);

async function getAllUsers(req, res) {
  try {
    const users = await Users.findAll({
      attributes: { exclude: "password" },
    });

    res.json(users);
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function getUser(req, res) {
  try {
    const user = await Users.findOne({
      where: { id: req.params.id },
      attributes: { exclude: "password" },
    });

    res.json(user ?? { message: "User not found 😞" });
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await Users.destroy({
      where: {
        id: req.params.id,
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

    const updatedUser = await Users.update(
      {
        ...req.body,
        password,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    res.json(
      updatedUser == 0
        ? { message: "User not found 😞" }
        : { message: "User updated successfully 😃" },
    );
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

    const newUser = await Users.create({
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
