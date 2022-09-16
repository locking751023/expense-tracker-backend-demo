'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associations(models) {
      Record.belongsTo(models.User, { foreignKey: 'userId' })
      Record.belongsTo(models.Location, { foreignKey: 'locationId' })
      Record.hsaMany(models.RecordedProduct, { foreignKey: 'recordId' })
    }
  }
  Record.init({
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records',
    underscored: true
  });
  return Record;
};