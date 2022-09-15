'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const locations = await queryInterface.sequelize.query(
      'SELECT id FROM Locations;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Records',
      Array.from({ length: 30 }, (_, i) => ({
        date:(i < 10 ? `2022/09/0${ i + 1 }` : `2022/09/${ i + 1 }`),
        created_at: new Date(),
        updated_at: new Date(),
        user_id: users[Math.floor( i / 10 )].id,
        location_id: locations[Math.floor(Math.random() * locations.length)].id,
      }))
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Records', null, {})
  }
};