'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'root',
        email: 'root@example.com',
        password: await bcrypt.hash('00000000', 10),
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user1',
        email: 'user1@example.com',
        password: await bcrypt.hash('11111111', 10),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user2',
        email: 'user2@example.com',
        password: await bcrypt.hash('22222222', 10),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
