(async ()=>{
    try{
        const database = require('./db')
        const User = require('./Models/User')
        const Posts = require('./Models/Posts')
        const LikeList = require('./Models/LikeList')
        const Comments = require('./Models/Comments')

        await database.sync()
    }
    catch(error){
        console.log(error)
    }
})();
