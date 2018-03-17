// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }

    console.log('Connected to mongodb server');
    const db = client.db('TodoApp');

    // deleteMany
    /*db.collection('Todos').deleteMany({text: 'Lunch'}).then((result) => {
        console.log(result);
    });*/

    // deleteOne
    /*db.collection('Todos').deleteOne({text: 'Lunch'}).then((result) => {
        console.log(result);
    });*/

    // find One and Delete
    /*db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });*/

    db.collection('Users').deleteMany({name: 'Arun Tej Chennadi'}).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5aad6a2c62f3c43e18b1d726')}).then((result) => {
        console.log(result);
    });

    //client.close();

});