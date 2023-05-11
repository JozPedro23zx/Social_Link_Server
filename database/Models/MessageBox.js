const Sequelize = require('sequelize')
const database = require('../db')

const MessageBox = database.define('message_box', {
    id_message: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_sender: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_recipient: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    type_message:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = MessageBox