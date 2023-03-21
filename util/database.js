const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('todo-list', 'root', 'nodecomplete', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;