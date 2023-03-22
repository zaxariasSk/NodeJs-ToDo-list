const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('todo-list', 'root', 'olimpos7', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = sequelize;