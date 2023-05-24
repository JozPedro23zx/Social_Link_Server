require('dotenv/config');
const express = require('express');
const app = express();
const router = require('./routers');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const MessageBoxService = require('./Services/MessageBoxService');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('trust proxy', 1);

app.use(cors({
    "origin": process.env.FRONTEND,
    "methods": "GET,HEAD,POST",
    credentials: true
}));

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND)
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  next()
});


const io = new Server(server, {
    cors: {
        origin: `${process.env.FRONTEND}`,
        methods: ["GET", "POST"],
    },
    transports: ['websocket']
});


io.on("connection", async (socket) =>{
    console.log("User connect:", socket.id)

    // socket.data.username = "123h"
    // const sockets = await io.fetchSockets()
    
    // user = sockets.find((userSocket)=>{return userSocket.data.username === '123h'})
    // console.log("User connect:", user.id)

    socket.on("set_user_id", async (data) =>{
        socket.data.userId = data[0]
        console.log('User id:',socket.data.userId)
    })

    socket.on("send_notification", async ({idRecipient, idSender, type})=>{
        const sockets = await io.fetchSockets()
        const userSocket = sockets.find((user)=>{return user.data.userId === idRecipient})
        
        if(userSocket){
            io.to(userSocket.id).emit("get_notification", {
                idSender,
                type
            })
        }
        MessageBoxService.SendMessage(type, idRecipient, idSender)

    })

    socket.on("join_room", (data) =>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} JOINED room: ${data}`)
    })

    socket.on("leave_room", (data) =>{
        socket.leave(data)
        console.log(`User with ID: ${socket.id} LEAVED room: ${data}`)
    })

    socket.on("send_message", (data) =>{
        socket.to(data.roomId).emit("receive_message", data)
    })

    socket.on("disconnect", ()=>{
        console.log("User Disconnect: ", socket.id)
        console.log("=================================")
    })
});


app.use(router);

PORT = process.env.PORT;

server.listen(PORT, error=>{
    error ? console.log(error) : console.log(`Api server running in port ${PORT}`)
});