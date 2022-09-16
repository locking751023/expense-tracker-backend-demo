'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RecordedProduct extends Model {
    static associations(models) {
      RecordedProducts.belongsTo(models.Product, { foreignKey: 'productId'})
      RecordedProducts.belongsTo(models.Record, { foreignKey: 'recordId' })
    }
  }
  RecordedProduct.init({
    history_price: DataTypes.INTEGER,
    history_cost: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    send_back: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RecordedProduct',
    tableName: 'RecordedProducts',
    underscored: true
  });
  return RecordedProduct;
};