const validator = require('validator')
const _ = require('lodash')

const { User } = require('../database')

const authenticate = (request, response, next) => {

    let bearerToken = request.headers.authorization || (request.header('x-auth') || '')
    const bearer = 'Bearer'
    let token

    if (validator.contains(bearerToken, bearer)) {
        const [_bearer, _token] = _.split(bearerToken, ' ')
        token = _token

    } else {
        token = bearerToken

    }

    User.findByToken(token)
        .then(user => {
            if (!user) {
                return Promise.reject('Unauthorized!!!')

            }
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