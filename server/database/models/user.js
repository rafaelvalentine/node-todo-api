const mongoose = require('mongoose')


const schema = {
    email: {
        type: String,
        required: true,
        minLenght: 1,
        trim: true
    },
    createddAt: {
        type: Date,
        default: new Date().toISOString()
    }

}

const collectionName = 'Users'
const userSchema = mongoose.Schema(schema)
const User = mongoose.model(collectionName, userSchema)

module.exports = {
    User
}