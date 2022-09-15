'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Recorded_products', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: false,     
      references: {
        model: 'Products',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Recorded_products', 'product_id')
  }
};
