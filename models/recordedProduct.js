'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RecordedProduct extends Model {
    static associate(models) {
      RecordedProduct.belongsTo(models.Product, { foreignKey: 'productId'})
      RecordedProduct.belongsTo(models.Record, { foreignKey: 'recordId' })
    }
  }
  RecordedProduct.init({
    historyPrice: DataTypes.INTEGER,
    historyCost: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    sendBack: DataTypes.FLOAT,
    recordId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RecordedProduct',
    tableName: 'Recorded_products',
    underscored: true
  });
  return RecordedProduct;
};