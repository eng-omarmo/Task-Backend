const express = require('express')
const route = express.Router()

const { getUser, createUser, updateUser, deleteUser, loginUser } = require('../Controllers/UserController')
const authMiddleware = require('../middlware/auth')

route.get('/', authMiddleware, getUser).post('/',createUser);

route.put('/:id', authMiddleware, updateUser).delete('/:id', authMiddleware, deleteUser);

route.post('/login', loginUser)


module.exports = route

