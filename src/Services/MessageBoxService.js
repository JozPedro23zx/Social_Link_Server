const Posts = require('../../database/Models/Posts')
const MessageBox = require('../../database/Models/MessageBox')

class MessageBoxService{
    async SendMessage(type, postId, senderUserId){
        const post = await Posts.findByPk(postId)
        console.log(post.id_user)
        MessageBox.create({
            id_sender: senderUserId,
            id_recipient: post.id_user,
            type_message: type
        })
    }

    async GetMessages(userId){
        const messages = MessageBox.findAll({where: {id_recipient: userId}})
        return messages
    }
}

module.exports = new MessageBoxService()