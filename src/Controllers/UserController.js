const User = require('../../database/Models/User')
const bcrypt = require('bcrypt')

class UserController{
    async getUser(req, res){
        try{
            var data = await User.findByPk(req.params.userId)
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
        const userId = req.user ? req.session.user : 0
        var message
        try{
            var user = await User.findByPk(userId)
            if (!user) message = "Error authentication"

            let comparePassword = bcrypt.compareSync(passwordConfirm, user.password)
            if(!comparePassword) message = "Wrong Password"
            else{
                message = ""
                user.name = username == '' ? user.name : username
                user.password = password == '' ? user.password : await bcrypt.hash(password, 10)
                user.avatar = avatarId == '' ? user.avatar : `https://res.cloudinary.com/dhuy2dkhc/image/upload/v1649078845/${avatarId}`

                await user.save()
            } 
            
            res.send(message)

        }catch(err){
            console.log(err)
        }
    }
    
    async registerUser(req, res){
        const {username, password, passwordRepeat} = req.body
        var data = await User.findOne({where: {name: username}})
        var mistake = [""]
        
        if(!username || !password || !passwordRepeat) mistake = ["Missing credentials"]
        else if(password !== passwordRepeat) mistake = ["Wrong passwords"]
        else if(data) mistake = ["This username has been registered"]
        else{
        mistake = [""]
            try{
                    const newUser = await User.create({
                        name: username,
                        password: password,
                        avatar: "https://res.cloudinary.com/dhuy2dkhc/image/upload/v1649078845/perfilIcons/default.png"
                    })
        
                    bcrypt.genSalt(10, function(err,salt){
                            bcrypt.hash(password, salt, function(err, hash){
                            if(err){
                                console.log(err)
                            }else{
                                newUser.password = hash
                                newUser.save()
                            }
                        })
                    })
            }catch(err){
                console.log(err)
            }
        }
        res.status(200).send(mistake)
    }
}

module.exports = new UserController()