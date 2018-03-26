const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/user');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
    let todo =  new Todo({
       text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({
            todos
        })
    }, (err) => {
        console.log('Unable to fetch todos ', err);
        res.status(400).send(err);
    })
})

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send('Invalid id');
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            console.log('No todo with id found');
            return res.status(404).send('No todo with id found');
        }

        res.status(200).send({todo});
    }).catch((e) => {
        console.log(e);
        res.status(400).send();
    })
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send(todo);

    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.listen(port, () => {
    console.log('Started on port: '+port);
});

module.exports = {app};