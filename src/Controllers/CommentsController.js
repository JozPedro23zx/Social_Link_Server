const Comments = require('../../database/Models/Comments')

class CommentsController{
    async getComments(){
        try{
            var data = await Comments.findAll({where: {id_post: req.params.postId}})
            res.status(200).send(data)
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new CommentsController()