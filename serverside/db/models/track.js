'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate(models) {
      // define association here
      Track.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  }
  Track.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    spotifyId: DataTypes.STRING,
    name: DataTypes.STRING,
    href: DataTypes.STRING,
    durationMs: DataTypes.INTEGER,
    explicit: DataTypes.BOOLEAN,
    popularity: DataTypes.INTEGER,
    artistId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};
