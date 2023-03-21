const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../util/database');  // importing sequelize object created in utils
const User = require('./userModel');
const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING
    },
    // optional sequelize can understand foreign key by default
    UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

module.exports = Project;