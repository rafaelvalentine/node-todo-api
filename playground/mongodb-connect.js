// const mongoClient = require('mongodb').MongoClient;
const { mongoClient, ObjectID } = require('mongodb');

const db_url = 'mongodb://localhost:27017/TodoApp'
mongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB Server!')
        return
    }

    console.log('Connection MongoDB Server successful!!!')
    const dbClient = client.db('Todo')
        // dbClient.collection('Todos')
        //     .insertOne({
        //         text: 'Something To do',
        //         completed: false
        //     }, (err, result) => {
        //         if (err) {
        //             console.log('unable to insert todo', err)
        //             return
        //         }
        //         console.log('Successfully saved to db: ', JSON.stringify(result.ops, undefined, 2))
        //         client.close()
        //     })


    dbClient.collection('User')
        .insertOne({
            name: 'Valentine',
            age: 27,
            location: 'Lagos, Nigheria'
        }, (err, result) => {
            if (err) {
                console.log('unable to insert todo', err)
                return
            }
            console.log('Successfully saved to db: ', JSON.stringify(result.ops, undefined, 2))
            client.close()
        })
})