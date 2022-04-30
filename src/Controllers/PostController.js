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
        try{
            var data
            if(req.params.search === "empty"){
                data = await Posts.findAll({order: [['updatedAt', 'DESC']]})
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
        var idImage = req.body.imageId
        var user = req.user
        var date = new Date()
        var currentDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
        try{
            Posts.create({
                id_user: user.id_user,
                date: currentDate,
                likes: 0,
                content: contentPost,
                image: idImage === '' ? idImage : `https://res.cloudinary.com/dhuy2dkhc/image/upload/v1651159775/${idImage}`
            })
            res.send("Post created")
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new PostControllers()