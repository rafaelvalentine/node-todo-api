const mongoose = require('mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

mongoose.Promise = global.Promise

const db_url = 'mongodb://localhost:27017/TodoApp';

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
        useUnifiedTopology: true
    })

module.exports = { connectToDB, Todo, User }