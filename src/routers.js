router = require('express').Router()
require('dotenv/config')
const passport = require('passport');

const CommentsController = require('./Controllers/CommentsController')
const LikeListController = require('./Controllers/LikeListController')
const ChatController = require('./Controllers/ChatController')
const PostController = require('./Controllers/PostController')
const UserController = require('./Controllers/UserController')

router.get('/getAllPosts/:search', PostController.getAllPost)
router.get('/getPost/:postId', PostController.getPost)
router.get('/getAllPostsOfUser/:userId', PostController.getPostOfUser)
router.post('/createPost', PostController.createPost)


router.get('/getLikeList/:userId', LikeListController.getLikeList)
router.post('/changeLikeList', LikeListController.changeLikeList)


router.get('/getComments/:postId', CommentsController.getComments)
router.post('/createComment', CommentsController.createComment)


router.get('/getUser/:userId', UserController.getUser)
router.get('/getUserByName/:userId', UserController.getUserByName)
router.post('/registerUser', UserController.registerUser)
router.post('/changeUserData', UserController.changeUserData)


router.get('/getMessage/:roomId', ChatController.getMessage)
router.post('/sendMessage', ChatController.sendMessage)
router.get('/getAllRooms', ChatController.getAllRooms)
router.post('/createRoom', ChatController.createRoom)


router.post('/login', (req, res, next) =>{
    passport.authenticate('local',
        (err, user, info)=>{
            if(err) throw err
            else if(!user) res.send([info.message])
            else {
                req.logIn(user, (err) => {
                    if(err) throw err
                    res.send(["Success"])
                })
            }
        }
    )(req, res, next)
})

router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect(process.env.FRONTEND)
})

router.get('/user', (req, res, next) => {
    if(req.isAuthenticated()){
        res.status(200).send([req.user.id_user])
    }else{
        res.send(null)
    }
})

module.exports = router