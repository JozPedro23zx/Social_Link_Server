const Sequelize = require('sequelize')
const database = require('../db')

const Comments = database.define('comments', {
    id_comment: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_post: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Comments