const Posts = require('../../database/Models/Posts')
const Comments = require('../../database/Models/Comments')
const LikeList = require('../../database/Models/LikeList')
const { Op } = require('sequelize')

class PostService{
    async getPost(postId){
        const post = await Posts.findByPk(postId)
        return post
    }

    async getAllPost(allIdPosts, search){
        var posts
        if(search === "empty"){
            posts = await Posts.findAll({where:{[Op.not]: {id_post: allIdPosts}}, order: [['updatedAt', 'DESC']], limit: 8 })
        }else{
            posts = await Posts.findAll({where: {content:{[Op.like]: `%${search}%`}}})
        }
        return posts
    }

    async getPostsOfUser(userId){
        var posts = await Posts.findAll({where: {id_user: userId}, order:[['createdAt', 'DESC']]})
        return posts
    }

    async createPost(contentPost, idImage, idUser, currentDate){
        Posts.create({
            id_user: idUser,
            date: currentDate,
            likes: 0,
            content: contentPost,
            image: idImage === '' ? idImage : `https://res.cloudinary.com/dhuy2dkhc/image/upload/v1651159775/${idImage}`
        })
    }

    async getComments(postId){
        var comment = await Comments.findAll({where: {id_post: postId}, order: [['createdAt', 'DESC']]})
        return comment
    }

    async createComment(idPost, idUser, content){
        Comments.create({
            id_post: idPost,
            id_user: idUser,
            comment: content
        })
    }

    async getLikeList(userId){
        var data = await LikeList.findOne({where: {id_user: userId}})
        return data
    }
    
    async changeLikeList(idUser, postId, isLike){
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

        return likesCount
    }
}

module.exports = new PostService()