router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv/config')

const CommentsController = require('./Controllers/CommentsController')
const LikeListController = require('./Controllers/LikeListController')
const ChatController = require('./Controllers/ChatController')
const PostController = require('./Controllers/PostController')
const UserController = require('./Controllers/UserController')

router.get('/getPost/:postId', PostController.getPost)
router.get('/getAllPostsOfUser/:userId', PostController.getPostOfUser)
router.post('/getAllPosts', PostController.getAllPost)
router.post('/createPost', PostController.createPost)


router.get('/getLikeList/:userId', LikeListController.getLikeList)
router.post('/changeLikeList', LikeListController.changeLikeList)


router.get('/getComments/:postId', CommentsController.getComments)
router.post('/createComment', CommentsController.createComment)


router.post('/login', UserController.loginUser)
router.get('/getUser/:userId', UserController.getUser)
router.get('/getUserByName/:userId', UserController.getUserByName)
router.post('/registerUser', UserController.registerUser)
router.post('/changeUserData', UserController.changeUserData)


router.get('/getMessage/:roomId', ChatController.getMessage)
router.post('/sendMessage', ChatController.sendMessage)
router.post('/getAllRooms', ChatController.getAllRooms)
router.post('/createRoom', ChatController.createRoom)

router.get('/logout', (req, res)=>{
    //
    res.redirect(process.env.FRONTEND)
})

router.post('/user', (req, res, next) => {
    var token = req.body.token
    var decoded = token ? jwt.verify(token, process.env.SESSION_SECRET).id : null
    res.send([decoded])
})

module.exports = router