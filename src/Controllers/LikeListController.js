const LikeList = require('../../database/Models/LikeList')
const Posts = require('../../database/Models/Posts')

class LikeListController{
    async getLikeList(req, res){
        try{
            var data = await LikeList.findOne({where: {id_user: req.params.userId}})
            var likes = []
            if(data) likes = data.likes
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
        var likesCount = []
        if(likesData === null){
            let newLikeList = await LikeList.create({
                id_user: idUser,
                likes: [postId]
            })
            await postData.increment('likes')
            likesCount = newLikeList.likes
        }
        else{

            if(isLike == false){
                await postData.increment('likes')
                likesData.update({likes: [...likesData.likes, postId]})
            }
            else if(isLike == true){
                postData.likes === 0 ? 0 : await postData.decrement('likes')
                let newListLikes = likesData.likes.filter(element => element !== postId)
                likesData.update({likes: [...newListLikes]})
            }
    
            likesCount = likesData.likes
        }
        res.status(200).send(likesCount)

    }catch(err){
        res.status(500).send("Error")
        console.log(err)
    }
    }
}

module.exports = new LikeListController()