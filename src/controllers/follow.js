const { User } = require("../models");

async function followUser(req, res) {
  try {
    const username = req.query.from;
    const followedUsername = req.params.id;

    // Check if the user is already following the given user
    const isFollowing = await User.findOne({
      where: { username },
      include: [
        { association: "followings", where: { username: followedUsername } },
      ],
    });

    if (isFollowing) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    }

    // Follow the user
    const user = await User.findOne({ where: { username } });
    const followedUser = await User.findOne({
      where: { username: followedUsername },
    });
    await user.addFollowings(followedUser);

    res.status(200).json({ message: "You are now following the user." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while following the user." });
  }
}

async function unfollowUser(req, res) {
  try {
    const username = req.query.from;
    const followedUsername = req.params.id;

    // Check if the user is following the given user
    const isFollowing = await User.findOne({
      where: { username },
      include: [
        { association: "followings", where: { username: followedUsername } },
      ],
    });

    if (!isFollowing) {
      return res
        .status(400)
        .json({ message: "You are not following this user." });
    }

    // Unfollow the user
    const user = await User.findOne({ where: { username } });
    const followedUser = await User.findOne({
      where: { username: followedUsername },
    });
    await user.removeFollowings(followedUser);

    res.status(200).json({ message: "You have unfollowed the user." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while unfollowing the user." });
  }
}

module.exports = {
  followUser,
  unfollowUser,
};
