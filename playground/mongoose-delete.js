const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

/*Todo.remove({}).then((result) => {
    console.log(result);
});*/

Todo.findByIdAndRemove('5ab88ad48573f538844d66a3').then((todo) => {
    if(!todo){
        return console.log('No todo with this id');
    }

    console.log('Succesfully deleted: '+ todo);

}).catch((err) => {
    console.log(err);
})
