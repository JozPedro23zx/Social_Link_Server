require('dotenv/config')
const express = require('express')
const app = express()
const router = require('./routers')

const cookieParser = require("cookie-parser");


const passport = require("passport")
const session = require('express-session')

const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(cors({
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,POST",
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize())
app.use(passport.session())
require('../authentication/auth')(passport)


app.use(router)

PORT = process.env.PORT
app.listen(PORT, error=>{
    error ? console.log(error) : console.log(`Api server running in port ${PORT}`)
})