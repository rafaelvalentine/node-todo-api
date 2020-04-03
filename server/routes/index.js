const express = require('express')


const todoController = require('../controllers/todoController')


const BaseRoute = express.Router()

BaseRoute
    .post('/todo', todoController.create)


module.exports = BaseRoute