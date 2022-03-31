const Sequelize = require('sequelize')

const sequelize = new Sequelize('localDB', 'postgres', '1235', {
    host: '192.168.0.4',
    dialect: 'postgres'
})

sequelize.authenticate().then(() => {
    console.log("Success!");
  }).catch((err) => {
    console.log(err);
  });
module.exports = sequelize