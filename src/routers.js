router = require('express').Router()
const CommentsController = require('./Controllers/CommentsController')
const LikeListController = require('./Controllers/LikeListController')
const PostController = require('./Controllers/PostController')
const UserController = require('./Controllers/UserController')

router.get('/getAllPosts', PostController.getAllPost)
router.get('/getPost/:postId', PostController.getPost)
router.get('/getAllPostsOfUser/:userId', PostController.getPostOfUser)

router.get('/getLikeList', LikeListController.getLikeList)
router.post('/changeLikeList', LikeListController.getLikeList)

router.get('/getComments/:postId', CommentsController.getComments)

router.get('/getUser/:userId', UserController.getUser)



module.exports = router