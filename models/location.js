'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associations(models) {
      Location.hsaMany(models.Record, { foreignKey: 'locationId' })
    }
  }
  Location.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'Locations',
    underscored: true
  });
  return Location;
};