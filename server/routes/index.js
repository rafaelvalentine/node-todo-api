const express = require('express')
const { authenticate } = require('../middleware')


const todoController = require('../controllers/todoController')
const usersController = require('../controllers/usersController')

const BaseRoute = express.Router()

BaseRoute
    .get('/todo', authenticate, todoController.get)
    .post('/todo', authenticate, todoController.create)
    .get('/todo/:id', authenticate, todoController.fetch)
    .patch('/todo/:id', authenticate, todoController.patch)
    .delete('/todo/:id', authenticate, todoController.delete)
    .post('/user/register', usersController.create)
    .get('/user/info/:id', authenticate, usersController.user)
    .post('/user/login', usersController.login)
    .delete('/user/logout', authenticate, usersController.logout)

module.exports = BaseRoute