const Comments = require('../../database/Models/Comments')

class CommentsController{
    async getComments(req, res){
        try{
            var data = await Comments.findAll({where: {id_post: req.params.postId}})
            res.status(200).send(data)
        }catch(err){
            console.log(err)
        }
    }

    async createComment(req, res){
        const {content, idUser, idPost} = req.body
        try{
            Comments.create({
                id_post: idPost,
                id_user: idUser,
                comment: content
            })
            res.send("Post created")
        }catch(err){
            console.log(er)
        }
    }
}

module.exports = new CommentsController()