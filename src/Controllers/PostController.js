const PostService = require("../Services/PostService")

class PostControllers{
    async getPost(req, res){
        try{
            var data = await PostService.getPost(req.params.postId)
            res.status(200).send(data)
        }catch(error){
            console.log(error)
        }
    }

    async getAllPost(req, res){
        const {allIdPosts, search} = req.body
        try{
            const data = await PostService.getAllPost(allIdPosts, search)
            res.status(200).send(data)
        }catch(error){
            console.log(error)
        }
    }

    async getPostOfUser(req, res){
        try{
            var data = await PostService.getPostsOfUser(req.params.userId)
            res.status(200).send({data})
        }catch(error){
            console.log(error)
        }
    }

    async createPost(req, res){
        var contentPost = req.body.content
        var idImage = req.body.imageId
        var idUser = req.body.idUser
        var date = new Date()
        var currentDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
        try{
            await PostService.createPost(contentPost, idImage, idUser, currentDate)
            res.send("Post created")
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new PostControllers()