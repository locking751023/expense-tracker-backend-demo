'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Records', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: false,     
      references: {
        model: 'Locations',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Records', 'location_id')
  }
};
