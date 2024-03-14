"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
    }

    toJSON() {
      return { ...this.get(), userId: undefined };
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      location: DataTypes.STRING,
      contents: DataTypes.STRING,
      difficulty: DataTypes.INTEGER,
      images: DataTypes.STRING,
      itinerary: DataTypes.STRING,
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
