const { ObjectID } = require('mongodb')

const { connectToDB, Todo, User } = require('../server/database')
connectToDB()
const todoId = '5e97408927c6ad9adc0740eb'
const userId = "5e85039d8dfbf0da686664a7"
const id = 'fdkhkagjnaagtnekagn'

// Todo.remove({})
//     .then(result => {
//         console.log(result)
//     }).catch(err => {
//         console.log(err)
//     });

Todo.findOneAndRemove({ _id: '5ea8d70c8bb767adc7c557c0' })
    .then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    });

Todo.findByIdAndRemove('5ea8d6e68bb767adc7c557b3')
    .then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    });