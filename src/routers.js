router = require('express').Router()
const User = require('../database/Models/User')
const Posts = require('../database/Models/Posts')
const LikeList = require('../database/Models/LikeList')
const Comments = require('../database/Models/Comments')



router.get('/getUser/:userId', async (req, res) => {
    try{
        var data = await User.findByPk(req.params.userId)
        res.status(200).send({data})
    }catch(error){
        console.log(error)
    }
})

router.get('/getLikeList', async (req, res) => {
    try{
        var data = await LikeList.findOne({where: {id_user: 5}})
        var likes = data.likes
        res.status(200).send({likes})
    }catch(error){
        console.log(error)
    }
})

router.get('/getAllPosts', async (req, res)=>{
    try{
        var data = await Posts.findAll()
        res.status(200).send({data})
    }catch(error){
        console.log(error)
    }
})

router.get('/getPost/:postId', async (req, res) => {
    try{
        var data = await Posts.findByPk(req.params.postId)
        res.status(200).send(data)
    }catch(error){
        console.log(error)
    }
})

router.get('/getAllPostsOfUser/:userId', async (req, res)=>{
    try{
        var data = await Posts.findAll({where: {id_user: req.params.userId}})
        res.status(200).send(data)
    }catch(error){
        console.log(error)
    }
})


router.get('/getComments/:postId', async (req, res)=>{
    try{
        var data = await Comments.findAll({where: {id_post: req.params.postId}})
        res.status(200).send(data)
    }catch(err){
        console.log(err)
    }
})

router.post('/changeLikeList', async (req, res) =>{
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
})


module.exports = router