'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tracks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      spotifyId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      href: {
        type: Sequelize.STRING
      },
      durationMs: {
        type: Sequelize.INTEGER
      },
      explicit: {
        type: Sequelize.BOOLEAN
      },
      popularity: {
        type: Sequelize.INTEGER
      },
      artistId: {
        type: Sequelize.UUID,
        references: {
          model: 'Artists',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tracks');
  }
};
