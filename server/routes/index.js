const express = require('express')


const todoController = require('../controllers/todoController')


const BaseRoute = express.Router()

BaseRoute
    .get('/todo', todoController.get)
    .post('/todo', todoController.create)
    .get('/todo/:id', todoController.fetch)
    .patch('/todo/:id', todoController.patch)
    .delete('/todo/:id', todoController.delete)


module.exports = BaseRoute