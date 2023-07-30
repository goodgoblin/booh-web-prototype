'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      // define association here
    }
  }
  Playlist.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    spotifyId: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    href: DataTypes.STRING,
    ownerId: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
