const Sequelize = require('sequelize')
const database = require('../db')

const Messages = database.define('messages', {
    id_message: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_room: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    message:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    date:{
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Messages