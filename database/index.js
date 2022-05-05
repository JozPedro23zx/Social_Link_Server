(async ()=>{
    try{
        const database = require('./db')
        const User = require('./Models/User')
        const Posts = require('./Models/Posts')
        const LikeList = require('./Models/LikeList')
        const Comments = require('./Models/Comments')
        const Messages = require('./Models/Messages')
        const Rooms = require('./Models/Rooms')

        await database.sync()
    }
    catch(error){
        console.log(error)
    }
})();
