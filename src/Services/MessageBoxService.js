const Posts = require('../../database/Models/Posts')
const MessageBox = require('../../database/Models/MessageBox')

class MessageBoxService{
    async SendMessage(type, recipientUserId, senderUserId){
        // const post = await Posts.findByPk(postId)
        console.log(type)
        MessageBox.create({
            id_sender: senderUserId,
            id_recipient: recipientUserId,
            type_message: type
        })
    }

    async GetMessages(userId){
        const messages = MessageBox.findAll({where: {id_recipient: userId}})
        return messages
    }

    async DeleteMessage(idSender, typeMessage){
        // const messages = MessageBox.findAll({where: {id_sender: idSender, type_message: typeMessage}})
        // if(messages){
        //     messages.map(async (message)=>{
        //         await message.destroy({force: trye})
        //     })
        // }
        
        await MessageBox.destroy({where: {id_sender: idSender, type_message: typeMessage}})
    }
}

module.exports = new MessageBoxService()