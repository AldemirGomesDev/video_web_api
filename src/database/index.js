const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Video = require('../models/Video');

const connection = new Sequelize(dbConfig);

User.init(connection);
Video.init(connection);

User.associate(connection.models);
Video.associate(connection.models);

module.exports = connection;