const Sequelize = require('sequelize')
const database = require('../db')

const LikeList = database.define('like_list', {
    id_like: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    likes: Sequelize.ARRAY(Sequelize.INTEGER),
})

module.exports = LikeList