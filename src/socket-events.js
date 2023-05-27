const { Server } = require('socket.io');
const MessageBoxService = require('./Services/MessageBoxService');

const socketHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: `${process.env.FRONTEND}`,
            methods: ["GET", "POST"],
        },
        transports: ['websocket']
    });

    io.on("connection", async (socket) => {
        console.log("User connect:", socket.id)

        socket.on("set_user_id", async (data) => {
            socket.data.userId = data[0]
            console.log('User id:', socket.data.userId)
        })

        socket.on("send_notification", async ({ roomId, idRecipient, idSender, type }) => {
            const socketsOfRooms = await io.in(roomId).fetchSockets()
            const userSocketFromRoom = socketsOfRooms.find((user) => { return user.data.userId === idRecipient })
            if(!userSocketFromRoom){
                const sockets = await io.fetchSockets()
                const userSocket = sockets.find((user) => { return user.data.userId === idRecipient })
                if (userSocket) {
                    io.to(userSocket.id).emit("get_notification", {
                        idSender,
                        type
                    })
                }
                MessageBoxService.SendMessage(type, idRecipient, idSender)
            }

        })

        socket.on("join_room", (data) => {
            socket.join(data)
            console.log(`User with ID: ${socket.id} JOINED room: ${data}`)
        })

        socket.on("leave_room", (data) => {
            socket.leave(data)
            console.log(`User with ID: ${socket.id} LEAVED room: ${data}`)
        })

        socket.on("send_message", (data) => {
            socket.to(data.roomId).emit("receive_message", data)
        })

        socket.on("disconnect", () => {
            console.log("User Disconnect: ", socket.id)
            console.log("=================================")
        })
    });
};

module.exports = socketHandler;
