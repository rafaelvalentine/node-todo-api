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
                if (err.errors && err.errors.email) {
                    response.status(400).send({
                            message: 'Invalid Credentials',
                            status: 'Bad Request',
                            statusCode: 400,
                            // error: err
                            error: err.errors.email.message
                        })
                        // return
                } else if (err.errors && err.errors.password) {
                    response.status(400).send({
                            message: 'Invalid Credentials',
                            status: 'Bad Request',
                            statusCode: 400,
                            // error: err
                            error: err.errors.password.message
                        })
                        // return
                } else if (err && err.errmsg) {
                    response.status(400).send({
                        message: 'Invalid Credentials',
                        status: 'Bad Request',
                        statusCode: 400,
                        // error: err
                        error: err.errmsg
                    })
                } else {
                    response.status(500).send({
                        message: 'Something went wrong',
                        status: 'Internl server error',
                        statusCode: 500,
                        // error: err
                        error: err
                    })
                }
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
                data: _.pick(request.user, ['_id', 'email', 'password', 'createdAt']),
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
    },

    /**
     *@name login
     *@description login a user
     *@param {Object} request
     *@param {Object} response
     *@returns {Null} null
     */

    login(request, response) {
        const userInfo = _.pick(request.body, ['email', 'password'])

        User.findByCredentials(userInfo)
            .then(user => user.generateAuthToken()
                .then(token => {
                    response.header('x-auth', token).status(200).send({
                        data: user,
                        message: `Found User: ${user.email}`,
                        status: 'OK',
                        statusCode: 200
                    })
                })
            )
            .catch(err => {
                response.status(401).send({
                    message: 'Invalid Credentials',
                    status: 'Unauthorized',
                    statusCode: 401,
                    error: 'Not Authenticated, bad userId or token'
                })
            })
    },
    /**
     *@name logout
     *@description logout a user 
     *@param {Object} request
     *@param {Object} response
     *@returns {Null} null
     */

    logout(request, response) {
        const user = request.user
        const token = request.token

        user.deleteToken(token)
            .then(user => {
                response.status(200).send({
                    message: `Logged User: ${user.email}`,
                    status: 'OK',
                    statusCode: 200
                })
            }, () => {
                response.status(400).send()
            })
    }

}))()

module.exports = usersController