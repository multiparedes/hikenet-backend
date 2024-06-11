"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ User, Comment }) {
      this.belongsTo(User, { foreignKey: "userId" });

      this.hasMany(Comment, { foreignKey: "postId" });
    }

    toJSON() {
      return { ...this.get(), userId: undefined };
    }
  }

  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title cannot be null",
          },
          len: {
            args: [1, 255],
            msg: "Title must be between 1 and 255 characters",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description cannot be null",
          },
        },
      },
      location: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Location cannot be null",
          },
        },
      },
      contents: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Contents cannot be null",
          },
        },
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Difficulty cannot be null",
          },
          min: {
            args: [1],
            msg: "Difficulty must be at least 1",
          },
          max: {
            args: [10],
            msg: "Difficulty must be at most 10",
          },
        },
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      itinerary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
    },
  );

  return Post;
};
