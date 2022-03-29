const Sequelize = require('sequelize')
const database = require('../db')

const Posts = database.define('posts', {
    idPost: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    date:{
        type: Sequelize.STRING,
        allowNull: false
    },
    likes: Sequelize.INTEGER,
    avatar: Sequelize.STRING,
    content: Sequelize.STRING
})

module.exports = Posts