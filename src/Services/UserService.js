const User = require('../../database/Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserService{
    async getUser(userId){
        const user = await User.findByPk(userId)
        return user
    }

    async changeUserData(userId, username, password, passwordConfirm, avatarId){
        var message = ""
        var user = await User.findByPk(userId)
        if (!user) message = "Error authentication"
        let comparePassword = bcrypt.compareSync(passwordConfirm, user.password)
        if(!comparePassword) message = "Wrong Password"
        else{
            message = "Success"
            user.name = username == '' ? user.name : username
            user.password = password == '' ? user.password : await bcrypt.hash(password, 10)
            user.avatar = avatarId == '' ? user.avatar : `https://res.cloudinary.com/dhuy2dkhc/image/upload/v1649078845/${avatarId}`
            await user.save()
        } 
        return message
    }

    async loginUser(username, password){
        var message = ''

        var user = await User.findOne({where: {name: username}})

        if(username === '' || password === ''){
            message = "Enter With username & password"
        }
        else if(!user){
            message = "User not registered"
        }else{
            var isValid = bcrypt.compareSync(password, user.password)
            if(!isValid) message = "The password is incorrect"
            else{
                var token = jwt.sign({id: user.id_user}, process.env.SESSION_SECRET, {expiresIn: '1d'})
                message = "Success"
            }
        }

        return {message, token}

    }

    async registerUser(username, password, passwordRepeat){
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
        return mistake
    }
}

module.exports = new UserService()