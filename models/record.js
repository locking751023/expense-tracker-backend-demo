'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    date: DataTypes.STRING
  }, {});
  Record.associate = function(models) {
    Record.belongsTo(models.User)
    Record.belongsTo(models.Location)
    Record.hasMany(models.RecordedProducts)
  };
  return Record;
};