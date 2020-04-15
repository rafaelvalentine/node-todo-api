const { ObjectID } = require('mongodb')

const { connectToDB, Todo, User } = require('../server/database')
connectToDB()
    // const todoId = '5e97408927c6ad9adc0740eb'
const userId = "5e85039d8dfbf0da686664a7"
const id = 'fdkhkagjnaagtnekagn'

// Todo.find({
//         _id
//     })
//     .then(results => (
//         console.log('Todos: ', results)
//     ))


// Todo.findOne({
//         _id
//     })
//     .then(result => (
//         console.log('Todo: ', result)
//     ))


// Todo.findById({
//         _id
//     })
//     .then(result => (
//         console.log('Todo by Id:', result)
//     ))

// if (!ObjectID.isValid(id)) {
//     return console.log('Not Valid ID')
// }

// Todo.findById({
//         _id: id
//     })
//     .then(result => {
//         if (!result) {
//             return console.log('couldn\'t find id')
//         }
//         console.log('Todo by Id:', result)
//     })
//     .catch(e => console.log(e))


User.findById({
        _id: userId
    })
    .then(result => {
        if (!result) {
            return console.log('couldn\'t find id')
        }
        console.log('User by Id:', result)
    })

User.findById({
        _id: '5e97408927c6ad9adc0740eb'
    })
    .then(result => {
        if (!result) {
            return console.log('couldn\'t find id')
        }
        console.log('User by Id:', result)
    })
    .catch(e => console.log(e))
User.findById({

    })
    .then(result => {
        if (!result) {
            return console.log('couldn\'t find id')
        }
        console.log('User by Id:', result)
    })
    .catch(e => console.log(e))