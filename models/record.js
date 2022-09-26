'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associate(models) {
      Record.belongsTo(models.User, { foreignKey: 'userId' })
      Record.belongsTo(models.Location, { foreignKey: 'locationId' })
      Record.hasMany(models.RecordedProduct, { foreignKey: 'recordId' })
    }
  }
  Record.init({
    date: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records',
    underscored: true
  });
  return Record;
};