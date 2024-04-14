const express = require('express')
const route = express.Router()
const { getTasks, createTask, deleteTask } = require('../Controllers/TaskController')



route.get('/', getTasks).post('/', createTask)

route.put('/:id').delete('/:id', deleteTask)

module.exports = route