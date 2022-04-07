const LikeList = require('../../database/Models/LikeList')

class LikeListController{
    async getLikeList(req, res){
        try{
            var data = await LikeList.findOne({where: {id_user: 5}})
            var likes = data.likes
            res.status(200).send({likes})
        }catch(error){
            console.log(error)
        }
    }

    async changeLikeList(req, res){
        const {idUser, postId, isLike} = req.body
    try{
        const likesData = await LikeList.findOne({where: {id_user: idUser}})
        const postData = await Posts.findOne({where: {id_post: postId}})

        if(isLike == false){
            await postData.increment('likes')
            likesData.update({likes: [...likesData.likes, postId]})
        }
        else if(isLike == true){
            await postData.decrement('likes')
            newListLikes = likesData.likes.filter(element => element !== postId)
            likesData.update({likes: [...newListLikes]})
        }

        var likesCount = likesData.likes
        res.status(200).send(likesCount)
    }catch(err){
        res.status(500).send("Error")
        console.log(err)
    }
    }
}

module.exports = new LikeListController()