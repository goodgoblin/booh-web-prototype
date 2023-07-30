'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtistImage extends Model {
    static associate(models) {
      // define association here
      ArtistImage.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      ArtistImage.belongsTo(models.Image, {
        foreignKey: 'imageId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  ArtistImage.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    artistId: DataTypes.UUID,
    imageId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ArtistImage',
  });
  return ArtistImage;
};
