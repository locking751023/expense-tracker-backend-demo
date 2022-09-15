'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecordedProducts = sequelize.define('Recorded_products', {
    history_price: DataTypes.INTEGER,
    history_cost: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    send_back: DataTypes.INTEGER
  }, {});
  RecordedProducts.associate = function(models) {
    RecordedProducts.belongsTo(models.Product)
    RecordedProducts.belongsTo(models.Record)
  };
  return RecordedProducts;
};