const User = require('../database/Models/User')

class UserController{
    async getUser(req, res){
        try{
            var data = await User.findByPk(req.params.userId)
            res.status(200).send({data})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new UserController()