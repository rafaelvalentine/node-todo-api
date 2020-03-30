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
        .find()
        .count()
        .then(count => {
            console.log('Todos')
            console.log(`This are the number of Todos: ${count} `)
        }).catch(err => {
            console.log('unable to fetch todos', err)
        })
        // .find({ _id: ObjectID('5e82090f8c061e2251250593') })
        // .toArray()
        // .then(results => {
        //     console.log('Todos')
        //     console.log('This are the Todos:', JSON.stringify(results, undefined, 2))
        // }).catch(err => {
        //     console.log('unable to fetch todos', err)
        // })


    dbClient.collection('Users')
        .find({ name: 'Rafael' })
        .toArray()
        .then(results => {
            console.log('Todos')
            console.log('This are the Todos:', JSON.stringify(results, undefined, 2))
        }).catch(err => {
            console.log('unable to fetch todos', err)
        })

})