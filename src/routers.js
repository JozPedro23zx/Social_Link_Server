router = require('express').Router()
const User = require('../database/Models/User')
const Posts = require('../database/Models/Posts')
const LikeList = require('../database/Models/LikeList')


router.get('/getPost/:postId', async (req, res) => {
    try{
        var data = await Posts.findByPk(req.params.postId)
        res.status(200).send(data)
    }catch(error){
        console.log(error)
    }
})

router.get('/getUsers', async (req, res) => {
    try{
        var data = await User.findOne()
    }catch(error){
        console.log(error)
    }
})

router.get('/getLikeList', async (req, res) => {
    try{
        var data = await LikeList.findOne({where: {idUser: 5}})
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

router.post('/changeLikeList', async (req, res) =>{
    const {idUser, postId, isLike} = req.body
    try{
        const likesData = await LikeList.findOne({where: {idUser: idUser}})
        const postData = await Posts.findOne({where: {idPost: postId}})

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