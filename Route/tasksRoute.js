const express = require('express')
const route = express.Router()
const { getTasks, createTask, deleteTask, updateTask } = require('../Controllers/TaskController')



route.get('/', getTasks).post('/', createTask)

route.put('/:id',updateTask).delete('/:id', deleteTask)

module.exports = route