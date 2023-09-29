const express = require('express')
const cors = require('cors')
const app = express()
const { userRoute } = require('./routes/userRoute.route')
const { connection } = require('./db')
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use('/users',userRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server run at ${process.env.port}`)
    } catch (error) {
        console.log(error.message)
    }
})
