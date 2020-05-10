const { ObjectID } = require('mongodb')
const validator = require('validator')
const _ = require('lodash')

const { User } = require('../database')

const authenticate = (request, response, next) => {
    const id = request.params.id
    let bearerToken = request.headers.authorization || (request.header('x-auth') || null)
    const bearer = 'Bearer'
    let token

    if (validator.contains(bearerToken, bearer)) {
        const [_bearer, _token] = _.split(bearerToken, ' ')
        token = _token
    } else {
        token = bearerToken
    }
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