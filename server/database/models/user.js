const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const schema = {
    email: {
        type: String,
        required: true,
        minLenght: 1,
        trim: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: '{VALUE} is a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLenght: 8
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }],
    createddAt: {
        type: Date,
        default: new Date().toISOString()
    }

}

const collectionName = 'Users'
const userSchema = new mongoose.Schema(schema)
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    const authToken = _.findIndex(userObject.tokens, { 'access': 'auth' })
    const token = userObject.tokens[authToken].token
    return {..._.pick(userObject, ['_id', 'email', 'create', 'createddAt']), token }
}
userSchema.methods.generateAuthToken = function() {
    const user = this
    const access = 'auth'
    const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123')
    user.tokens = user.tokens.concat([{ access, token }])
        // user.tokens = [...user.tokens, { access, token }]
    return user.save()
        .then(() => token)
}

userSchema.statics.findByToken = function(token, id) {
    const User = this
    let decoded
    try {
        decoded = jwt.verify(token, 'abc123')
        if (!validator.equals(decoded._id, id)) {
            throw Error
        }

    } catch (error) {
        return new Promise((resolve, reject) => {
            reject('Not Authenticated, bad userId or token')
        })
    }
    return User.findOne({
        _id: id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })

}

const User = mongoose.model(collectionName, userSchema)

module.exports = {
    User
}