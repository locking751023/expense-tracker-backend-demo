'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.RecordedProducts)
  };
  return Product;
};