'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
        product_name: 'Нормомед',
        price: 1562,
        picture: 'https://images.apteka.ru/origin_b1616696-28b1-4deb-831e-ac880d56015a.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Найз',
        price: 308,
        picture: 'https://images.apteka.ru/original_c76b7ab0-9d45-4e34-b9d9-187728b4e0e1.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Лазолван',
        price: 265,
        picture: 'https://images.apteka.ru/origin_3b887255-4205-4498-9c12-d2ecf78c3b41.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Глицин',
        price: 110,
        picture: 'https://images.apteka.ru/origin_792d660f-e76d-4c91-b69b-3f07cfe58910.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Детралекс',
        price: 3066,
        picture: 'https://images.apteka.ru/origin_b4cd8f11-635b-4226-a2e5-b02b414a37a5.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Стрессанет',
        price: 471,
        picture: 'https://images.apteka.ru/original_2083a40b-7fa4-4913-8977-a338c0a2e467.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Компливит',
        price: 207,
        picture: 'https://images.apteka.ru/original_aed5c0cf-2f2c-4db0-a8ae-be0e9ecf6d2a.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Супрастин',
        price: 133,
        picture: 'https://images.apteka.ru/original_da9caaeb-7521-4f96-942d-5537ea912136.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Вольтарен',
        price: 48,
        picture: 'https://images.apteka.ru/original_8576fdee-3f3a-4c8c-b395-6413ad05aa5d.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Амоксиклав',
        price: 274,
        picture: 'https://images.apteka.ru/original_06e47a39-bad0-492a-b716-14add3631604.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Перфектил',
        price: 863,
        picture: 'https://images.apteka.ru/origin_39059ad3-4902-4a5b-b893-4550d45eeab6.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Кальцимакс',
        price: 314,
        picture: 'https://images.apteka.ru/original_f52b01ab-772e-48c1-b8bc-d3dd51cda8d3.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Но-шпа',
        price: 123,
        picture: 'https://images.apteka.ru/origin_9e9bda03-6f07-4713-bea4-3ecde7692d4c.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], 
    {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
