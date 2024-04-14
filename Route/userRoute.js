const express = require('express')
const route = express.Router()

const { getUser, createUser, updateUser, deleteUser, loginUser } = require('../Controllers/UserController')
const authMiddleware = require('../middlware/auth')

route.post('/',createUser);

route.put('/:id', authMiddleware, updateUser).delete('/:id', authMiddleware, deleteUser).get('/:id', authMiddleware, getUser);

route.post('/login', loginUser)


module.exports = route

