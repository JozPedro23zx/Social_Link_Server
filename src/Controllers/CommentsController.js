const Comments = require('../../database/Models/Comments')
const MessageBoxService = require('../Services/MessageBoxService')
const PostService = require('../Services/PostService')

class CommentsController{
    async getComments(req, res){
        try{
            var data = await PostService.getComments(req.params.postId)
            res.status(200).send(data)
        }catch(err){
            console.log(err)
        }
    }

    async createComment(req, res){
        const {content, idUser, idPost} = req.body
        try{
            if(content) PostService.createComment(idPost, idUser, content)
            MessageBoxService.SendMessage("comment", idPost, idUser)
            res.send("Post created")
        }catch(err){
            console.log(er)
        }
    }
}

module.exports = new CommentsController()