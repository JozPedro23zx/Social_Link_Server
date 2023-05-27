require('dotenv/config');
const express = require('express');
const app = express();
const router = require('./routers');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const socketHandler = require('./socket-events')

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


socketHandler(server)

app.use(router);

PORT = process.env.PORT;

server.listen(PORT, error=>{
    error ? console.log(error) : console.log(`Api server running in port ${PORT}`)
});