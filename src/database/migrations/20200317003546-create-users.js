'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Esse campo não pode ser vazio"
          },
          len: {
            args: [4, 20],
            msg: "Esse campo deve ter entre 4 e 20 caracteres"
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      islogged: Sequelize.BOOLEAN
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('users');

  }
};
