'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'isadmin',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'users',
        'registration',
        {
          type: Sequelize.INTEGER
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'isadmin'),
      queryInterface.removeColumn('users', 'registration')
    ]);
  }
};
