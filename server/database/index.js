const mongoose = require('mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

mongoose.Promise = global.Promise

const db_url = process.env.MONGODB_URI;
const db = mongoose.connection

db.on('error', () => {
    console.log('> error occured from the database')
})
db.once('open', () => {
    console.log('> successfully opened the database')
})
const connectToDB = () =>
    mongoose.connect(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

module.exports = { connectToDB, Todo, User }