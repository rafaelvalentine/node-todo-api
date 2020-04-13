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
    }




}))()

module.exports = todoController