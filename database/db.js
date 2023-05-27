require('dotenv/config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {dialect: 'postgres'})


sequelize.authenticate().then(() => {
    console.log("Connection with database is success");
  }).catch((err) => {
    console.log(err);
  });

sequelize.sync()

module.exports = sequelize