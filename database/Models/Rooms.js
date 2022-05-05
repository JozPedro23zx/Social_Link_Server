const Sequelize = require('sequelize')
const database = require('../db')

const Rooms = database.define('rooms', {
    id_room: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    users: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
    }
})

module.exports = Rooms