const Posts = require('../../database/Models/Posts')
const { Op } = require('sequelize')

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
        console.log(req.params.search)
        try{
            var data
            if(req.params.search === "empty"){
                data = await Posts.findAll()
            }else{
                data = await Posts.findAll({where: {content:{[Op.like]: `%${req.params.search}%`}}})
            }
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

    async createPost(req, res){
        var contentPost = req.body.content
        var idUser = req.body.idUser
        var date = new Date()
        var currentDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
        try{
            Posts.create({
                id_user: idUser,
                date: currentDate,
                likes: 0,
                content: contentPost
            })
            res.send("Post created")
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new PostControllers()