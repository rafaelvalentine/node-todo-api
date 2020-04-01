// const mongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

const db_url = "mongodb://localhost:27017/TodoApp";
MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log("Unable to connect to MongoDB Server!");
        return;
    }

    console.log("Connection MongoDB Server successful!!!");
    const dbClient = client.db("Todo");

    // dbClient.collection('Todos')
    //     .findOneAndUpdate({ _id: ObjectID('5e8232328c061e2251250c09') }, { $set: { completed: true } }, { returnNewDocument: false })
    //     .then(results => {
    //         console.log('Todos')
    //         console.log('This are the Todos:', JSON.stringify(results, undefined, 2))
    //     }).catch(err => {
    //         console.log('unable to fetch todos', err)
    //     })

    dbClient
        .collection("Users")
        .findOneAndUpdate({ _id: ObjectID("5e84e6138c061e2251251a9c") }, { $set: { name: "Alexis" }, $inc: { age: 5 } }, { returnOriginal: false, upsert: true })
        .then(results => {
            console.log("Todos");
            console.log("This are the Todos:", JSON.stringify(results, undefined, 2));
        })
        .catch(err => {
            console.log("unable to fetch todos", err);
        });
});