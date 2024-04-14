const express = require('express')
const route = express.Router()

const { getUser, createUser, updateUser, deleteUser } = require('../Controllers/UserController')

route.get('/',getUser).post('/',createUser)

route.put('/:id',updateUser).delete('/:id',deleteUser)

module.exports = route

