'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Session.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    startAt: DataTypes.DATE,
    endAt: DataTypes.DATE,
    userId: DataTypes.UUID,
    playlistId: DataTypes.UUID,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};
