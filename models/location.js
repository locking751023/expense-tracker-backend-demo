'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.hasMany(models.Record, { foreignKey: 'locationId' })
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