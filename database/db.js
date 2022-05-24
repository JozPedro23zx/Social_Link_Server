require('dotenv/config')
const Sequelize = require('sequelize')

var sequelize
var notice

if(process.env.DATABASE_URL){
  notice = "connected to the HEROKU server"
  console.log("connected to the HEROKU server")
  sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
      }
  })
}
else{
  console.log("connected to the LOCAL server")
  sequelize = new Sequelize(process.env.DATABASE_LOCAL, {
    dialect: 'postgres'
})
}


sequelize.authenticate().then(() => {
    console.log(notice);
  }).catch((err) => {
    console.log(err);
  });
module.exports = sequelize