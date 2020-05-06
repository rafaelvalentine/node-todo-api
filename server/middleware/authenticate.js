const { ObjectID } = require('mongodb')

const { User } = require('../database')

const authenticate = (request, response, next) => {
    const id = request.params.id
    const token = request.header('x-auth') || null
    if (!ObjectID.isValid(id)) {
        response.status(400).send({
            message: 'Authentication failed',
            status: 'Bad Request',
            statusCode: 400
        })
        return
    }
    User.findByToken(token, id)
        .then(user => {
            request.user = user
            request.token = token
            next()
        })
        .catch(err => {
            response.status(401).send({
                message: 'Invalid Credentials',
                status: 'Unauthorized',
                statusCode: 401,
                error: err
            })
            console.log('error from conroller: ', err)
        })
}
module.exports = authenticate