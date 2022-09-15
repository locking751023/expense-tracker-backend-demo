'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const records = await queryInterface.sequelize.query(
      'SELECT id FROM Records;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const products = await queryInterface.sequelize.query(
      'SELECT id, price, cost FROM Products;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Recorded_products',
      Array.from({ length: 480 }, (_, i) => ({
        history_price: products[i - 16 * Math.floor(i / 16)].price,
        history_cost: products[i - 16 * Math.floor(i / 16)].cost,
        amount: Math.floor(Math.random() * 10),
        send_back: Math.floor(Math.random() * 1),
        created_at: new Date(),
        updated_at: new Date(),
        record_id: records[Math.floor(i / 16)].id,
        product_id: products[i - 16 * Math.floor(i / 16)].id,
      }))
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recorded_products', null, {})
  }
};
