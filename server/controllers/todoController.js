const { Todo } = require('../database')

/**
 *@name todoController
 *@returns {Object} Functions
 */

const todoController = (() => ({

    /**
     *@name create
     *@param {Object} request
     *@param {Object} response
     *@returns {Object} Functions
     */

    create: (request, response) => {
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
}))()

module.exports = todoController