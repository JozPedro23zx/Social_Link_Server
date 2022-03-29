(async ()=>{
    try{
        const database = require('./db')
        const User = require('./Models/User')
        const Posts = require('./Models/Posts')
        const LikeList = require('./Models/LikeList')

        await database.sync()

        await LikeList.create({
            idUser: "4",
            likes: [1, 2]
        })
    }
    catch(error){
        console.log(error)
    }
})();
