// const mongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb')

const db_url = 'mongodb://localhost:27017/TodoApp'
MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB Server!')
        return
    }

    console.log('Connection MongoDB Server successful!!!')
    const dbClient = client.db('Todo')

    dbClient.collection('Todos')

    // deleteMany
    // .deleteMany({ text: 'Eat lunch', completed: false })
    //     .then(({ result }) => {
    //         console.log('Todos')
    //         console.log(`This are the deleted Todos: ${JSON.stringify(result, undefined, 2)} `)
    //     }).catch(err => {
    //         console.log('unable to fetch todos', err)
    //     })

    // deleteOne
    // .deleteOne({ text: 'Eat lunch', completed: false })
    //     .then(({ result }) => {
    //         console.log('Todos')
    //         console.log(`This are the deleted Todos: ${JSON.stringify(result, undefined, 2)} `)
    //     }).catch(err => {
    //         console.log('unable to fetch todos', err)
    //     })

    // findOneandDelete
    // .findOneAndDelete({ text: 'Eat lunch', completed: true })
    //     .then(({ value: result }) => {
    //         console.log('Todos')
    //         console.log(`This are the deleted Todos: ${JSON.stringify(result, undefined, 2)} `)
    //     }).catch(err => {
    //         console.log('unable to fetch todos', err)
    //     })




    dbClient.collection('Users')

    // deleteMany
    .deleteMany({ name: 'Bobby' })
        .then(({ result }) => {
            console.log('Users')
            console.log(`This are the deleted Users: ${JSON.stringify(result, undefined, 2)} `)
        }).catch(err => {
            console.log('unable to fetch users', err)
        })
    dbClient.collection('Users')
        // deleteOne
        .deleteOne({ name: 'Rafael' })
        .then(({ result }) => {
            console.log('User')
            console.log(`This are the deleted User: ${JSON.stringify(result, undefined, 2)} `)
        }).catch(err => {
            console.log('unable to fetch user', err)
        })
    dbClient.collection('Users')
        // findOneandDelete
        .findOneAndDelete({ _id: ObjectID("5e82351a8c061e2251250c9b") })
        .then(({ value: result }) => {
            console.log('User')
            console.log(`This are the deleted User: ${JSON.stringify(result, undefined, 2)} `)
        }).catch(err => {
            console.log('unable to fetch user', err)
        })
})