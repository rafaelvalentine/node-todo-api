const express = require('express')


const todoController = require('../controllers/todoController')


const BaseRoute = express.Router()

BaseRoute
    .get('/todo', todoController.get)
    .post('/todo', todoController.create)


module.exports = BaseRoute