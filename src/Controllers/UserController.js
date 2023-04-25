const UserService = require('../Services/UserService')

class UserController{
    async getUser(req, res){
        try{
            var data = await UserService.getUser(req.params.userId)
            res.status(200).send(data)
        }catch(error){
            console.log(error)
        }
    }

    async getUserByName(req, res){
        try{
            res.status(200).send({data})
        }catch(error){
            console.log(error)
        }
    }

    async changeUserData(req, res){
        const {username, password, passwordConfirm, avatarId} = req.body
        const userId = req.body.idUser || 0
        try{
            const data = await UserService.changeUserData(userId, username, password, passwordConfirm, avatarId)
            
            res.send(message)

        }catch(err){
            console.log(err)
        }
    }
    
    async loginUser(req, res){
        const {username, password} = req.body
        
        const data = await UserService.loginUser(username, password)

        res.send(data)
    }



    async registerUser(req, res){
        const {username, password, passwordRepeat} = req.body
        try{
            const data = await UserService.registerUser(username, password, passwordRepeat)
    
            res.status(200).send(data)
        }catch(err){
            res.status(400).send(err)
        }
    }
}

module.exports = new UserController()