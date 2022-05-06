require('dotenv/config')
const express = require('express')
const app = express()
const router = require('./routers')
const cookieParser = require("cookie-parser");
const passport = require("passport")
const session = require('express-session')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(cors({
    "origin": process.env.FRONTEND,
    "methods": "GET,HEAD,POST",
    credentials: true
}))



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize())
app.use(passport.session())
require('../authentication/auth')(passport)


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) =>{
    console.log("User connect:", socket.id)

    socket.on("join_room", (data) =>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} JOINED room: ${data}`)
    })

    socket.on("leave_room", (data) =>{
        socket.leave(data)
        console.log(`User with ID: ${socket.id} LEAVED room: ${data}`)
    })

    socket.on("send_message", (data) =>{
        console.log(data)
        socket.to(data.roomId).emit("receive_message", data)
    })

    socket.on("disconnect", ()=>{
        console.log("User Disconnect: ", socket.id)
        console.log("=================================")
    })
})


app.use(router)

PORT = process.env.PORT
server.listen(PORT, error=>{
    error ? console.log(error) : console.log(`Api server running in port ${PORT}`)
})