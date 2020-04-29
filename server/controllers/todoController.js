const { ObjectID } = require('mongodb')

const { Todo } = require('../database')

/**
 *@name todoController
 *@returns {Object} Functions
 */

const todoController = (() => ({

    /**
     *@name create
     *@description creates a new todo
     *@param {Object} request
     *@param {Object} response
     *@returns {Null} null
     */

    create(request, response) {
        const newTodo = new Todo({
            text: request.body.text
        })
        newTodo.save()
            .then(result => {
                response.send(result)
            }).catch(err => {
                response.status(400).send(err)
                console.log(err)
            })
    },

    /**
     *
     * @name get
     * @description fetches all todos for a user
     * @param {*} request
     * @param {*} response
     */
    get(request, response) {
        Todo.find()
            .then(result => {
                response.send({
                    status: 'ok',
                    data: result
                })
            }).catch(err => {
                response.status(400).send(err)
                console.log(err)
            })
    },

    /**
     *
     * @name fetch
     * @description fetches a single todo for a user
     * @param {*} request
     * @param {*} response
     */

    async fetch(request, response) {
        const id = request.params.id

        if (!ObjectID.isValid(id)) {
            console.log('Not a Valid ID')
            return response.status(400).send({
                message: 'Not a Valid ID',
                status: 'Bad Request',
                statusCode: 400
            })
        }

        try {
            const todo = await Todo.findById(id)
            if (!todo) {
                response.status(404).send({
                    message: 'Couldn\'t find ID',
                    status: 'Not Found',
                    statusCode: 404
                })
                return console.log('Couldn\'t find ID')
            }
            response.status(200).send({
                data: todo,
                message: `Found Todo: ${id}`,
                status: 'OK',
                statusCode: 200
            })
        } catch (e) {
            response.status(500).send({
                message: 'Something went wrong',
                status: 'Internal Server Error',
                statusCode: 500
            })
            console.log(e)
        }
    },
    /**
     *
     * @name delete
     * @description deletes a single todo for a user
     * @param {*} request
     * @param {*} response
     */

    async delete(request, response) {
        const id = request.params.id

        if (!ObjectID.isValid(id)) {
            console.log('Not a Valid ID')
            return response.status(400).send({
                message: 'Not a Valid ID',
                status: 'Bad Request',
                statusCode: 400
            })
        }

        try {
            const todo = await Todo.findByIdAndRemove(id)
            if (!todo) {
                response.status(404).send({
                    message: 'Couldn\'t find ID',
                    status: 'Not Found',
                    statusCode: 404
                })
                return console.log('Couldn\'t find ID')
            }
            response.status(200).send({
                data: todo,
                message: `Deleted Todo: ${id}`,
                status: 'OK',
                statusCode: 200
            })
        } catch (e) {
            response.status(500).send({
                message: 'Something went wrong',
                status: 'Internal Server Error',
                statusCode: 500
            })
            console.log(e)
        }
    }

}))()

module.exports = todoController