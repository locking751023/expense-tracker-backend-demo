'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Records', 'LocationId', {
      type: Sequelize.INTEGER,
      allowNull: false,     
      references: {
        model: 'Locations',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Records', 'LocationId')
  }
};
