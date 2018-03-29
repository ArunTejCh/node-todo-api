const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');

const todos = [{
    _id: new ObjectID(),
    text: 'First todo entry'
}, {
    _id: new ObjectID(),
    text: 'Second todo entry'
}]
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos, (error, docs) => {
            if(error){
                return done(error);
            }
        });
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should add a new todo', (done) => {
        let text = 'Test Todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
    })

    it('should not create a todo with invalid body data', (done) => {
        let text = '';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if(err){
                    done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
    })
})

describe('GET /todos', () => {
    it('should fetch all todos', (done) => {
        request(app)
            .get('/todos/')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should return the todo object with the given id', (done) => {
        request(app)
            .get('/todos/'+todos[0]._id.toHexString())
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('First todo entry');
            })
            .end(done);
    });

    it('should return 404 when id is invalid', (done) => {
        request(app)
            .get('/todos/'+todos[0]._id.toHexString()+'99')
            .expect(404)
            .end(done);
    });

    it('should return 404 when object not found', (done) => {
        request(app)
            .get('/todos/'+new ObjectID())
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
   it('should delete the todo with the given id', (done) => {
        let hexId = todos[1]._id.toHexString();
        request(app)
            .delete('/todos/'+hexId)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[1].text);
            }).end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then((res) => {
                    expect(res).toBeNull();
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
   });

    it('should return 404 if the id is invalid', (done) => {
        let hexId = todos[1]._id.toHexString()+"xx";
        request(app)
            .delete('/todos/'+hexId)
            .expect(404)
            .end(done);
    });

    it('should return 404 if the todo is not found', (done) => {
        let hexId = new ObjectID();
        request(app)
            .delete('/todos/'+hexId)
            .expect(404)
            .end(done);
    });


});