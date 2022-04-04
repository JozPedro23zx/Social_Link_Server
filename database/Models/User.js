const Sequelize = require('sequelize')
const database = require('../db')

const User = database.define('user', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: Sequelize.STRING
})

module.exports = User