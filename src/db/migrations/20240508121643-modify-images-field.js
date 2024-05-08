"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a new column 'new_images' to store an array of text
    await queryInterface.addColumn("Posts", "new_images", {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    });

    try {
      // Migrate data from 'images' to 'new_images' as is
      await queryInterface.sequelize.query(
        'UPDATE "Posts" SET "new_images" = ARRAY["images"];',
      );
    } catch (error) {
      console.error("Error migrating data:", error);
    }

    // Remove the old 'images' column
    await queryInterface.removeColumn("Posts", "images");

    // Rename the new column to 'images'
    await queryInterface.renameColumn("Posts", "new_images", "images");
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes if needed
  },
};
