const Sequelize = require('sequelize')

const sequelize = new Sequelize('localDB', 'postgres', '1235', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(() => {
    console.log("Success!");
  }).catch((err) => {
    console.log(err);
  });
module.exports = sequelize