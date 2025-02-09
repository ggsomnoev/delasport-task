module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 120,
        },
      },
      favorite_color: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_preference: {
        type: Sequelize.ARRAY(Sequelize.STRING), // Changed to ARRAY of strings
        allowNull: false,
        validate: {
          isArrayOfValidOptions(value) {
            const validOptions = ['email', 'phone', 'sms'];
            value.forEach((v) => {
              if (!validOptions.includes(v)) {
                throw new Error('Invalid contact preference');
              }
            });
          },
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('users', ['id'], {
      name: 'users_id_index',
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('users', 'users_id_index');
    await queryInterface.dropTable('users');
  },
};
