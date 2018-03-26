const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');

const todos = [{
    text: 'First todo entry'
}, {
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
    it('should fetch all todos', () => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(() => done());
    })
});