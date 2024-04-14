const express = require('express')
const dotenv = require('dotenv').config()
const app = express()

const Port = 5000 || process.env.Port

app.listen(Port, () => {
    console.log(`app is running on Port ${Port}`)
})

app.use(express.json())

app.use('/api/tasks', require('./Route/tasksRoute'))
