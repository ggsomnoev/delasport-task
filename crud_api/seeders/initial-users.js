const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          name: 'Jake',
          surname: 'Paul',
          email: 'jake.paul@ufc.com',
          age: 30,
          favorite_color: 'pink',
          contact_preference: ['email'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Mike',
          surname: 'Tyson',
          email: 'mike.tyson@ufc.com',
          age: 60,
          favorite_color: 'red',
          contact_preference: ['phone_call'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Bao',
          surname: 'Tzak',
          email: 'bao.tzak@philips.com',
          age: 19,
          favorite_color: 'black',
          contact_preference: ['phone_call'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
