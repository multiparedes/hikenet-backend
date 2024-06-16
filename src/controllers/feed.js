const { User, Post, Comment, Like } = require("../models");

const { errorFunction } = require("../utils/basicUtils");

async function getFeed(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const page = parseInt(req.query.page, 10) || 0;
    const offset = page * limit;

    const user = await User.findOne({
      where: { username: req.params?.id },
      include: [{ association: "followings" }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followingsIds = user.followings.map((f) => f.id);

    const posts = await Post.findAndCountAll({
      where: { userId: followingsIds },
      include: [User, Comment, Like],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    const nextPage = page + 1;
    const next = `/feed/${req.params?.id}?limit=${limit}&page=${nextPage}`;

    console.log(posts.rows.length);
    console.log(limit);

    res.json({
      total: posts.count,
      next: limit <= posts.rows.length ? next : null,
      results: posts.rows,
    });
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

module.exports = { getFeed };
