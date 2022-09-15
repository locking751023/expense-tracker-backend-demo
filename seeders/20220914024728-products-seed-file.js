'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: '蹄膀',
        price: 220,
        unit: '個',
        cost: 70,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '豬腳',
        price: 12,
        unit: '兩',
        cost: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '五花肉',
        price: 22,
        unit: '兩',
        cost: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '嘴邊肉',
        price: 22,
        unit: '兩',
        cost: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '大腸',
        price: 30,
        unit: '兩',
        cost: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '豬尾',
        price: 22,
        unit: '兩',
        cost: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '雞腿',
        price: 33,
        unit: '支',
        cost: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '雞腳',
        price: 60,
        unit: '斤',
        cost: 20,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '豬耳',
        price: 18,
        unit: '兩',
        cost: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '豬舌',
        price: 80,
        unit: '個',
        cost: 26,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '雞翅',
        price: 18,
        unit: '支',
        cost: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '豆干',
        price: 70,
        unit: '斤',
        cost: 23,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '滷蛋',
        price: 100,
        unit: '斤',
        cost: 33,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '肉皮',
        price: 25,
        unit: '個',
        cost: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '虎掌皮',
        price: 22,
        unit: '兩',
        cost: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '松板',
        price: 32,
        unit: '兩',
        cost: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
