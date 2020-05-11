const _ = require('lodash')
const validator = require('validator')
const { ObjectID } = require('mongodb')

const { User } = require('../database')

/**
 *@name todoController
 *@returns {Object} Functions
 */

const usersController = (() => ({

    /**
     *@name create
     *@description creates a new user
     *@param {Object} request
     *@param {Object} response
     *@returns {Null} null
     */

    create(request, response) {
        const userInfo = _.pick(request.body, ['email', 'password'])
        const newUser = new User(userInfo)
        newUser.save()
            .then(() => newUser.generateAuthToken())
            .then(token => {
                response.header('x-auth', token).status(200).send({
                    data: newUser,
                    message: `Created User: ${newUser.email}`,
                    status: 'OK',
                    statusCode: 200
                })
            }).catch(err => {
                response.status(500).send({
                    message: 'Something went wrong',
                    status: 'Internal Server Error',
                    statusCode: 500,
                    error: err.errmsg || err.errors.password.message
                })
                console.log('error from conroller: ', err)
            })
    },

    /**
     *@name user
     *@description gets a user
     *@param {Object} request
     *@param {Object} response
     *@returns {Null} null
     */

    user(request, response) {
        const id = request.params.id
        if (!ObjectID.isValid(id)) {
            response.status(400).send({
                message: 'Authentication failed',
                status: 'Bad Request',
                statusCode: 400
            })
            return
        }
        if (validator.equals(request.user._id.toString(), id)) {
            response.status(200).send({
                data: request.user,
                message: `Found User: ${request.user.email}`,
                status: 'OK',
                statusCode: 200
            })
            return
        }
        response.status(401).send({
            message: 'Invalid Credentials',
            status: 'Unauthorized',
            statusCode: 401,
            error: 'Not Authenticated, bad userId or token'
        })
    }

}))()

module.exports = usersController