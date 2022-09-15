'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Recorded_products', 'record_id', {
      type: Sequelize.INTEGER,
      allowNull: false,     
      references: {
        model: 'Records',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Recorded_products', 'record_id')
  }
};
