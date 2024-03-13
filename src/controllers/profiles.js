const { Profile, User } = require("../models");

const { errorFunction } = require("../utils/basicUtils");

async function getProfile(req, res) {
  const user = await User.findOne({
    where: { username: req.params?.id },
  });

  if (!user) {
    return res.json({ message: "User not found 😞" });
  }

  const profile = await Profile.findOne({ where: { userId: user?.id } });

  res.json(profile);
}

async function postProfile(req, res) {
  try {
    const { description } = req.body;

    const user = await User.findOne({
      where: { username: req.params?.id },
    });

    if (!user) {
      res.json({ message: "User not found 😞" });
    }

    const profile = await Profile.create({ description, userId: user.id });

    res.json(profile);
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function patchProfile(req, res) {
  const user = await User.findOne({
    where: { username: req.params?.id },
  });

  if (!user) {
    res.json({ message: "User not found 😞" });
  }

  const profile = await Profile.findOne({ where: { userId: user?.id } });

  const newProfile = await profile.update(req.body);

  res.json(newProfile);
}

module.exports = {
  getProfile,
  postProfile,
  patchProfile,
};
