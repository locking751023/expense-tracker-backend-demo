'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Records', 'ProductId', {
      type: Sequelize.INTEGER,
      allowNull: false,     
      references: {
        model: 'Products',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Records', 'ProductId')
  }
};
