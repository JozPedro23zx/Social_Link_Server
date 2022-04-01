const Sequelize = require('sequelize')
const database = require('../db')

const Comments = database.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_post: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    comment: {
        type: Sequelize.TEXT
    }
})

module.exports = Comments