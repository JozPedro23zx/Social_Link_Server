const Sequelize = require('sequelize')
const database = require('../db')

const Posts = database.define('posts', {
    id_post: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    date:{
        type: Sequelize.STRING,
        allowNull: false
    },
    likes: Sequelize.INTEGER,
    content: Sequelize.STRING,
    image: Sequelize.STRING
})

module.exports = Posts