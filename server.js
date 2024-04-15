const express = require('express')
const dotenv = require('dotenv').config()
const cors= require('cors')
const connectDB = require('./config/db')
const app = express()

const Port = 5000 || process.env.Port

app.listen(Port, () => {
    console.log(`app is running on Port ${Port}`)
})
connectDB()
app.use(express.json())
app.use(cors())

app.use('/api/tasks', require('./Route/tasksRoute'))

app.use('/api/users', require('./Route/userRoute'))


