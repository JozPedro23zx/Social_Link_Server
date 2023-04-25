const PostService = require('../Services/PostService')

class LikeListController{
    async getLikeList(req, res){
        try{
            var data = await PostService.getLikeList(req.params.userId)
            res.status(200).send({data})
        }catch(error){
            console.log(error)
        }
    }

    async changeLikeList(req, res){
        const {idUser, postId, isLike} = req.body
    try{
        const data = await PostService.changeLikeList(idUser, postId, isLike)
        res.status(200).send(data)

    }catch(err){
        res.status(500).send("Error")
        console.log(err)
    }
    }
}

module.exports = new LikeListController()