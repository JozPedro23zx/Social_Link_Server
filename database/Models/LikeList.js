const Sequelize = require('sequelize')
const database = require('../db')

const LikeList = database.define('likeList', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    likes: Sequelize.ARRAY(Sequelize.INTEGER),
})

module.exports = LikeList