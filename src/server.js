const express = require('express')
const app = express()
const router = require('./routers')
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD"
}))

app.use(router)

const PORT = 8000
app.listen(PORT, error=>{
    error ? console.log(error) : console.log(`Api server running in port ${PORT}`)
})