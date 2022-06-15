const Rooms = require('../../database/Models/Rooms')
const Messages = require('../../database/Models/Messages')
const { Op } = require('sequelize')

class ChatController{

    async getAllRooms(req, res){
        try{
            const data = await Rooms.findAll({
                where:{
                    users:{
                        [Op.contains]: [req.body.idUser]
                    }
                }
            })
            res.status(200).send(data)
        }catch(err){console.log(err)}
    }

    async createRoom(req, res){
        var status
        const {user1, user2} = req.body
        try{
            const data = await Rooms.findOne({
                where: {
                    users:{
                        [Op.contained]: [user1, user2]
                    }
                }
            })
            if(data){
                status = "Chat already exist"
            }else{
                await Rooms.create({
                    users: [user1, user2]
                })
                status = "Room created"
            }
            res.status(200).send(status)
        }catch(err){console.log(err)}
    }

    async sendMessage(req, res){
        const {roomId, userId, message, time} = req.body
        try{
            await Messages.create({
                id_room: roomId,
                id_user: userId,
                message,
                date: time
            })
            res.status(200).send("Message sent")
        }catch(err){console.log(err)}
    }

    async getMessage(req, res){
        const roomId = req.params.roomId
        try{
            var messagesData = await Messages.findAll({where: {id_room: roomId}})
            var messageList = []
            if(messagesData){
                messagesData.map(message =>{
                    messageList.push(
                        {
                            roomId: message.id_room,
                            userId: message.id_user, 
                            message: message.message, 
                            time: message.createdAt
                        })
                    })
                }
            res.status(200).send(messageList)
        }catch(err){console.log(err)}
    }
}

module.exports = new ChatController()