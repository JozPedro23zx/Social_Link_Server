const LocalStrategy = require('passport-local').Strategy
const User = require('../database/Models/User')
const bcrypt = require('bcrypt')

module.exports = function(passport){
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        async function(username, password, done){
            try{
                var user = await User.findOne({where: {name: username}})
    
                if (!user) return done(null, false, {message: "User not registered"})
    
                const isValid = bcrypt.compareSync(password, user.password)
                if(!isValid) return done(null, false, {message: "The password is incorrect"})
    
                return done(null, user)
            }catch(err){
                done(err, false)
            }
        }
    ))


    passport.serializeUser(function(user, done){
        done(null, user.id_user)
    })

    passport.deserializeUser(async function(id, done){
        try{
            const user = await User.findByPk(id)
            done(null, user)
        } catch(err){
            done(err, null)
        }
    })
}