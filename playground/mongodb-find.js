// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }

    console.log('Connected to mongodb server');
    const db = client.db('TodoApp');

    /*db.collection('Todos').find({
        _id: new ObjectID('5aad6f5a3f6c0a01983e12ad')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });*/

    /*db.collection('Todos').find().count().then((count) => {
        console.log('Todos count: '+ count);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });*/

    db.collection('Users').find({
        name: 'Arun Tej Chennadi'
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    //client.close();

});