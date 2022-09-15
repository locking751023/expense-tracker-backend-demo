'use strict';

module.exports = {
 up: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Locations', [
      {
        name: '吳興市場',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '林口市場',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Locations', null, {})
  }
};
