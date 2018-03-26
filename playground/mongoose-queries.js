const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

let id = '5aada8ba89032f1b9c63ba90';

if(!ObjectID.isValid(id)){
    console.log('Invalid id');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('find - Got todos as :'+ todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('findOne - Got todo as :'+ todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Unable to find todo');
//     }
//     console.log('findById -Got todo as :'+ todo);
// }).catch((e) => {
//     console.log(e);
// });

User.findById(id).then((user) => {
    if(!user){
        return console.log('User not found with this id');
    }

    console.log('User found: '+ user);
}).catch((e) => {
    console.log(e);
});