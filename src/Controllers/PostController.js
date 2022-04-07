const Posts = require('../database/Models/Posts')


class PostControllers{
    async getPost(req, res){
        try{
            var data = await Posts.findByPk(req.params.postId)
            res.status(200).send(data)
        }catch(error){
            console.log(error)
        }
    }

    async getAllPost(req, res){
        try{
            var data = await Posts.findAll()
            res.status(200).send({data})
        }catch(error){
            console.log(error)
        }
    }

    async getPostOfUser(req, res){
        try{
            var data = await Posts.findAll({where: {id_user: req.params.userId}})
            res.status(200).send({data})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new PostControllers()